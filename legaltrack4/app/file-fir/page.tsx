"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export default function FileFIRPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    f_name: "",
    S_name: "",
    Email: "",
    contact: "",
    address: "",
    id_proof_type: "aadhar",
    ID_number: "",
    incidentDate: "",
    incident_time: "",
    location: "",
    description: "",
    incident_type: "theft",
    Witnesses: "",
    declaration: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePersonalInfo = () => {
    const requiredFields = ["f_name", "S_name", "Email", "contact", "address", "id_proof_type", "ID_number"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill all required fields: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.contact)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian phone number",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const validateIncidentInfo = () => {
    const requiredFields = ["incidentDate", "incident_time", "location", "description", "incident_type"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill all required fields: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return false;
    }

    // Validate incident date is not in future
    const incidentDate = new Date(formData.incidentDate);
    if (incidentDate > new Date()) {
      toast({
        title: "Invalid Date",
        description: "Incident date cannot be in the future",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declaration) {
      toast({
        title: "Declaration Required",
        description: "Please agree to the declaration before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/file-fir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          incidentDate: new Date(formData.incidentDate).toISOString(),
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        throw new Error(text || "Server returned unexpected response");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit FIR");
      }

      toast({
        title: "FIR Submitted Successfully",
        description: `Your FIR number is: ${data.data.firNumber}`,
      });

      // Reset form
      setFormData({
        f_name: "",
        S_name: "",
        Email: "",
        contact: "",
        address: "",
        id_proof_type: "aadhar",
        ID_number: "",
        incidentDate: "",
        incident_time: "",
        location: "",
        description: "",
        incident_type: "theft",
        Witnesses: "",
        declaration: false,
      });
      setActiveTab("personal");

    } catch (error: any) {
      console.error("Error submitting FIR:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your FIR. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>File FIR Report</CardTitle>
          <CardDescription>Fill out the form to file a First Information Report</CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="incident">Incident Details</TabsTrigger>
            <TabsTrigger value="review">Review & Submit</TabsTrigger>
          </TabsList>

          {/* Personal Details Tab */}
          <TabsContent value="personal">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="f_name">First Name *</Label>
                  <Input
                    id="f_name"
                    name="f_name"
                    value={formData.f_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="S_name">Last Name *</Label>
                  <Input
                    id="S_name"
                    name="S_name"
                    value={formData.S_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="Email">Email *</Label>
                <Input
                  id="Email"
                  name="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Phone Number *</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>ID Proof Type *</Label>
                <RadioGroup
                  value={formData.id_proof_type}
                  onValueChange={(value) => handleRadioChange("id_proof_type", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aadhar" id="aadhar" />
                    <Label htmlFor="aadhar">Aadhar Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pan" id="pan" />
                    <Label htmlFor="pan">PAN Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="voter" id="voter" />
                    <Label htmlFor="voter">Voter ID</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="passport" id="passport" />
                    <Label htmlFor="passport">Passport</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ID_number">ID Number *</Label>
                <Input
                  id="ID_number"
                  name="ID_number"
                  value={formData.ID_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => validatePersonalInfo() && setActiveTab("incident")}>
                  Next: Incident Details
                </Button>
              </div>
            </CardContent>
          </TabsContent>

          {/* Incident Details Tab */}
          <TabsContent value="incident">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="incidentDate">Incident Date *</Label>
                <Input
                  id="incidentDate"
                  name="incidentDate"
                  type="date"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incident_time">Incident Time *</Label>
                <Input
                  id="incident_time"
                  name="incident_time"
                  type="time"
                  value={formData.incident_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Incident Type *</Label>
                <RadioGroup
                  value={formData.incident_type}
                  onValueChange={(value) => handleRadioChange("incident_type", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="theft" id="theft" />
                    <Label htmlFor="theft">Theft/Robbery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="assault" id="assault" />
                    <Label htmlFor="assault">Assault</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fraud" id="fraud" />
                    <Label htmlFor="fraud">Fraud</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cybercrime" id="cybercrime" />
                    <Label htmlFor="cybercrime">Cybercrime</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="Witnesses">Witnesses (if any)</Label>
                <Textarea
                  id="Witnesses"
                  name="Witnesses"
                  value={formData.Witnesses}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("personal")}>
                  Back
                </Button>
                <Button onClick={() => validateIncidentInfo() && setActiveTab("review")}>
                  Next: Review
                </Button>
              </div>
            </CardContent>
          </TabsContent>

          {/* Review & Submit Tab */}
          <TabsContent value="review">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Personal Information</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p><span className="font-medium">Name:</span> {formData.f_name} {formData.S_name}</p>
                  <p><span className="font-medium">Email:</span> {formData.Email}</p>
                  <p><span className="font-medium">Phone:</span> {formData.contact}</p>
                  <p><span className="font-medium">Address:</span> {formData.address}</p>
                  <p><span className="font-medium">ID Proof:</span> {formData.id_proof_type} - {formData.ID_number}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Incident Details</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p><span className="font-medium">Date:</span> {formData.incidentDate}</p>
                  <p><span className="font-medium">Time:</span> {formData.incident_time}</p>
                  <p><span className="font-medium">Location:</span> {formData.location}</p>
                  <p><span className="font-medium">Type:</span> {formData.incident_type}</p>
                  <p><span className="font-medium">Description:</span> {formData.description}</p>
                  {formData.Witnesses && (
                    <p><span className="font-medium">Witnesses:</span> {formData.Witnesses}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="declaration"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                  className="h-4 w-4"
                  required
                />
                <Label htmlFor="declaration">
                  I declare that the information provided is true to the best of my knowledge
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("incident")}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit FIR"}
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}