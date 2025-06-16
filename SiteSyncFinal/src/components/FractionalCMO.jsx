import { ArrowRight, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


function FractionalCMO() {
  const benefits = [
    {
      title: 'Strategic Leadership',
      description: 'Get expert marketing leadership without the full-time cost.',
    },
    {
      title: 'Cost-Effective',
      description: 'Pay only for the expertise and time you need.',
    },
    {
      title: 'Flexible Engagement',
      description: 'Scale up or down based on your business needs.',
    },
    {
      title: 'Industry Experience',
      description: 'Benefit from cross-industry insights and best practices.',
    },
    {
      title: 'Results-Driven',
      description: 'Focus on measurable outcomes and ROI.',
    },
    {
      title: 'Team Development',
      description: 'Mentor and upskill your existing marketing team.',
    },
  ];

  const services = [
    {
      title: 'Strategic Growth Planning',
      description: 'Comprehensive marketing strategy aligned with your business goals.',
    },
    {
      title: 'Team Management',
      description: 'Hiring, training, and managing freelancers and in-house teams.',
    },
    {
      title: 'Weekly Reviews & Sprint Management',
      description: 'Regular check-ins and agile marketing implementation.',
    },
    {
      title: 'Budget Planning & ROI Mapping',
      description: 'Optimize your marketing spend for maximum return on investment.',
    },
    {
      title: 'Performance Dashboards',
      description: 'Real-time analytics and insights to track marketing performance.',
    },
    {
      title: 'Marketing Ops Setup',
      description: 'Tech stack, CRM, automation, and workflow optimization.',
    },
  ];

return (
  <div>
    <div className="relative bg-black py-24 px-6 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
      <motion.div
        className="mx-auto max-w-2xl text-center group cursor-pointer transition"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 8px 32px 0 rgba(255,0,0,0.10)",
          transition: { duration: 0.3 }
        }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 group-hover:text-red-500 transition-colors duration-200">
          Your Growth Partner.
          <span className="text-red-600"> On Demand</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-blue-100 group-hover:text-white transition-colors duration-200">
          Fractional CMO = Strategic Leadership + Operational Excellence, without the full-time cost.
        </p>
        <div className="mt-10">
          <Link
            to="/enquiry"
            className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-red-600 shadow-sm hover:bg-red-50 transition"
          >
            Become a Partner
          </Link>
        </div>
      </motion.div>
    </div>

    {/* Benefits Section */}
    <div className="py-24 sm:py-32 bg-blue-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          What is a Fractional CMO?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-12">
           A Fractional CMO is a part-time marketing leader who builds, leads, and optimizes your 
            marketing team. Whether you're pre-launch or scaling, we step in as your acting CMO.
          </p>
        
        
        </div>

           <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="bg-black border border-gray-800 p-8 rounded-lg text-white"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <h3 className="text-xl font-bold mb-4">Startups without a CMO</h3>
              <p className="text-gray-400 text-white">
                Get the expertise of a marketing leader without the full-time commitment and cost.
              </p>
            </motion.div>
            <motion.div 
              className="bg-black border border-gray-800 p-8 rounded-lg  text-white"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <h3 className="text-xl font-bold mb-4">Founders tired of micro-managing</h3>
              <p className="text-gray-400  text-white">
                Focus on your core business while we handle your marketing strategy and execution.
              </p>
            </motion.div>
            <motion.div 
              className="bg-black border border-gray-800 p-8 rounded-lg  text-white "
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <h3 className="text-xl font-bold mb-4">Companies in transition</h3>
              <p className="text-gray-400  text-white">
                Launching a new product, entering a new market, or scaling rapidly? We've got you covered.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
       
      {/* Services Section */}
     <div className="bg-black py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-red-600 sm:text-4xl">
        What You Get?
      </h2>
      <p className="mt-6 text-lg leading-8 text-white">
        Comprehensive marketing leadership tailored to your business needs.
      </p>
    </div>
    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="group flex flex-col rounded-2xl bg-gradient-to-br from-[#18181b] to-[#23272f] p-8 shadow-xl border border-gray-800 hover:border-red-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] cursor-pointer"
          >
            <dt className="text-lg font-semibold leading-7 text-red-500 group-hover:text-red-400 transition-colors duration-200 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full group-hover:bg-red-400 transition"></span>
              {service.title}
            </dt>
            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300 group-hover:text-white transition-colors duration-200">
              <p className="flex-auto">{service.description}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
</div>

      {/* CTA Section */}
      {/* <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your marketing?
              <br />
              Let's talk about your goals.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Schedule a consultation to discuss how our Fractional CMO services can
              help you achieve your business objectives.
            </p>
            <div className="mt-10">
              <Link
                to="/enquiry"
                className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Pricing Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the plan that fits your growth stage and marketing needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`${plan.highlighted ? 'border-red-600 bg-gray-900' : 'border-gray-800 bg-black'} border p-8 rounded-lg transition-all duration-300 hover:border-red-600`}
              >
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CircleCheck className="text-red-600 mt-0.5 mr-2 flex-shrink-0" size={16} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/enquiry" 
                  className={`block w-full py-3 text-center font-medium rounded-md transition-colors duration-200 ${
                    plan.highlighted 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">How it Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our streamlined process gets you from strategy to execution in record time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative bg-black border border-gray-800 p-8 rounded-lg">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/enquiry" 
              className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Let's Start Scaling <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Dummy data for pricingPlans and steps
const pricingPlans = [
  {
    name: "Starter",
    price: "$2,000",
    period: "/month",
    features: [
      "Part-time CMO (up to 10 hrs/week)",
      "Strategy & Planning",
      "Weekly Check-ins",
      "Email Support"
    ],
    highlighted: false
  },
  {
    name: "Growth",
    price: "$4,000",
    period: "/month",
    features: [
      "Fractional CMO (up to 20 hrs/week)",
      "Team Management",
      "Sprint Reviews",
      "Performance Dashboards",
      "Priority Support"
    ],
    highlighted: true
  },
  {
    name: "Scale",
    price: "$7,000",
    period: "/month",
    features: [
      "CMO-as-a-Service (up to 40 hrs/week)",
      "Full Marketing Ops Setup",
      "Budget & ROI Mapping",
      "Advanced Analytics",
      "Dedicated Slack Channel"
    ],
    highlighted: false
  }
];

const steps = [
  {
    number: 1,
    title: "Discovery & Audit",
    description: "We analyze your current marketing, goals, and team structure."
  },
  {
    number: 2,
    title: "Strategy & Roadmap",
    description: "We build a custom marketing plan aligned with your business objectives."
  },
  {
    number: 3,
    title: "Execution & Management",
    description: "We lead your team, manage campaigns, and optimize processes."
  },
  {
    number: 4,
    title: "Review & Scale",
    description: "We track results, iterate, and help you scale faster."
  }
];

export default FractionalCMO;