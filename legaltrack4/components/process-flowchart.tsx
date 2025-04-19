"use client"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export default function ProcessFlowchart() {
  const steps = [
    {
      number: "1",
      title: "Describe Your Case",
      description: "Provide details about your situation through our guided form",
    },
    {
      number: "2",
      title: "AI Analysis",
      description: "Our system analyzes your case using legal precedents and IPC guidelines",
    },
    {
      number: "3",
      title: "Get IPC Recommendations",
      description: "Receive accurate IPC section predictions with explanations",
    },
    {
      number: "4",
      title: "File Report or Get Guidance",
      description: "Proceed with online FIR filing or get detailed information about your legal options",
    },
  ]

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <div className="py-8" ref={ref}>
      <div className="flex flex-col md:flex-row items-start justify-between relative">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center md:w-1/4 p-4 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
          >
            <motion.div
              className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white text-xl font-bold mb-4"
              whileHover={{ scale: 1.1 }}
              initial={{ scale: 0.8 }}
              animate={inView ? { scale: 1 } : { scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {step.number}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-enhanced">{step.title}</h3>
            <p className="text-enhanced">{step.description}</p>
          </motion.div>
        ))}

        {/* Mobile connector line - removed horizontal lines but kept vertical for mobile */}
        <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-1 bg-primary">
          {steps.slice(0, -1).map((_, index) => (
            <motion.div
              key={index}
              className="absolute left-0 w-full"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.3 }}
              style={{
                transformOrigin: "top",
                top: `${index * 33}%`,
                height: "33%",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

