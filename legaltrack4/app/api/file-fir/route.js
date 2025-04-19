import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // 1. Check content type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid content type'
      }), {
        status: 415,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Parse request body
    const body = await request.json();

    // 3. Validate required fields
    const requiredFields = [
      'f_name', 'S_name', 'Email', 'contact', 'address',
      'id_proof_type', 'ID_number', 'incidentDate',
      'incident_time', 'location', 'description', 'incident_type'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Missing required fields',
        missingFields
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 4. Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.Email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid email format'
      }), { status: 400 });
    }

    // 5. Combine date and time into valid DateTime format
    const dateOnly = body.incidentDate.split('T')[0]; // Get just the date part
    const incidentDateTime = new Date(`${dateOnly}T${body.incident_time}:00`);

    if (isNaN(incidentDateTime)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid incident time format'
      }), { status: 400 });
    }

    // 6. Create FIR record
    const fir = await prisma.fIR.create({
      data: {
        f_name: body.f_name,
        S_name: body.S_name,
        Email: body.Email,
        contact: body.contact,
        address: body.address,
        id_proof_type: body.id_proof_type,
        ID_number: body.ID_number,
        incidentDate: new Date(body.incidentDate),
        incident_time: incidentDateTime,
        location: body.location,
        description: body.description,
        incident_type: body.incident_type,
        Witnesses: body.Witnesses || null
      }
    });

    // 7. Return success response
    return new Response(JSON.stringify({
      success: true,
      firNumber: `FIR-${new Date().getFullYear()}-${fir.id.toString().padStart(5, '0')}`,
      data: fir
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('FIR creation error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message || 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await prisma.$disconnect();
  }
}
