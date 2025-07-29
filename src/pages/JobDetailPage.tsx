import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Building, Mail, Phone, Sparkles, Star, CheckCircle, User, Zap } from 'lucide-react';

// Mock job data - in a real app, this would come from an API
const mockJobData = {
  '1': {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechFlow AB',
    location: 'Stockholm',
    industry: 'Teknologi',
    omfattning: 'Heltid',
    salary: '650,000 - 850,000 SEK',
    summary: 'Join our innovative team to build next-generation cloud platforms that serve millions of users worldwide.',
    aboutRole: 'As a Senior Software Engineer at TechFlow, you\'ll be at the forefront of developing cutting-edge solutions that power our global platform. You\'ll work with a passionate team of engineers, designers, and product managers to create scalable, reliable, and user-friendly applications. This role offers the perfect blend of technical challenges and creative problem-solving in a fast-paced, collaborative environment.',
    responsibilities: [
      'Design and develop scalable web applications using React, TypeScript, and Node.js',
      'Collaborate with cross-functional teams to define and implement new features',
      'Optimize application performance and ensure high code quality',
      'Mentor junior developers and contribute to technical decision-making',
      'Participate in code reviews and maintain comprehensive documentation',
      'Stay current with emerging technologies and industry best practices'
    ],
    requirements: [
      '5+ years of experience in full-stack software development',
      'Expert knowledge of React, TypeScript, and modern JavaScript',
      'Strong experience with Node.js and RESTful API development',
      'Familiarity with cloud platforms (AWS, Azure, or GCP)',
      'Experience with agile development methodologies',
      'Excellent problem-solving skills and attention to detail',
      'Strong communication skills and team collaboration abilities'
    ],
    recruitmentProcess: 'Our recruitment process is designed to be thorough yet respectful of your time. It typically takes 2-3 weeks and includes an initial phone screening (30 minutes), a technical assessment (take-home project), an on-site interview with the team (2-3 hours), and a final culture-fit conversation with leadership. We provide feedback at every stage and are happy to accommodate any scheduling needs.',
    recruiterEmail: 'sarah.johnson@techflow.se',
    recruiterPhone: '+46 8 123 456 78',
    companyLogo: 'T',
    featured: true
  },
  '2': {
    id: '2',
    title: 'Marketing Manager',
    company: 'GrowthCo',
    location: 'Göteborg',
    industry: 'Marknadsföring',
    omfattning: 'Heltid',
    salary: '450,000 - 550,000 SEK',
    summary: 'Lead our dynamic marketing team and develop growth strategies that drive business success.',
    aboutRole: 'As Marketing Manager at GrowthCo, you\'ll spearhead our marketing initiatives and drive brand awareness across multiple channels. You\'ll work closely with sales, product, and design teams to create compelling campaigns that resonate with our target audience. This role is perfect for a strategic thinker who loves data-driven marketing and creative storytelling.',
    responsibilities: [
      'Develop and execute comprehensive marketing strategies',
      'Manage digital marketing campaigns across multiple platforms',
      'Analyze campaign performance and optimize for better ROI',
      'Collaborate with sales team to generate qualified leads',
      'Oversee content creation and brand messaging',
      'Manage marketing budget and vendor relationships'
    ],
    requirements: [
      '3+ years of experience in digital marketing',
      'Strong knowledge of Google Analytics and marketing automation tools',
      'Experience with SEO/SEM and social media marketing',
      'Excellent written and verbal communication skills',
      'Data-driven mindset with strong analytical skills',
      'Experience managing marketing budgets',
      'Bachelor\'s degree in Marketing or related field'
    ],
    recruitmentProcess: 'Our hiring process includes a phone interview (30 minutes), a portfolio review and case study presentation (1 hour), and a final interview with the leadership team (45 minutes). We value creativity and strategic thinking, so be prepared to share examples of successful campaigns you\'ve managed.',
    recruiterEmail: 'anna.lindberg@growthco.se',
    recruiterPhone: '+46 31 987 654 32',
    companyLogo: 'G',
    featured: true
  },
  '3': {
    id: '3',
    title: 'UX Designer',
    company: 'DesignStudio',
    location: 'Remote',
    industry: 'Design',
    omfattning: 'Konsult',
    salary: '4,000 - 5,000 SEK/dag',
    summary: 'Create user-centered design solutions that delight customers and drive business results.',
    aboutRole: 'Join our creative team as a UX Designer where you\'ll craft intuitive and beautiful user experiences for our diverse client portfolio. You\'ll work on projects ranging from mobile apps to enterprise software, always putting the user at the center of your design process. This remote position offers flexibility while working with a collaborative, international team.',
    responsibilities: [
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with developers to ensure design implementation',
      'Present design concepts to clients and stakeholders',
      'Maintain and evolve design systems',
      'Stay updated with latest UX trends and best practices'
    ],
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Sketch, or similar design tools',
      'Strong portfolio demonstrating user-centered design process',
      'Experience with user research and testing methodologies',
      'Understanding of front-end development principles',
      'Excellent communication and presentation skills',
      'Ability to work independently in a remote environment'
    ],
    recruitmentProcess: 'We start with a portfolio review, followed by a design challenge (take-home), a virtual interview with our design team (1.5 hours), and a final conversation with project managers. We\'re looking for designers who can think strategically and execute beautifully.',
    recruiterEmail: 'maria.design@designstudio.se',
    recruiterPhone: '+46 70 555 123 45',
    companyLogo: 'D',
    featured: false
  },
  '4': {
    id: '4',
    title: 'Data Analyst',
    company: 'DataInsights',
    location: 'Malmö',
    industry: 'Analys',
    omfattning: 'Heltid',
    salary: '420,000 - 520,000 SEK',
    summary: 'Transform raw data into actionable insights that drive strategic business decisions.',
    aboutRole: 'As a Data Analyst at DataInsights, you\'ll be responsible for analyzing complex datasets to uncover trends and patterns that inform business strategy. You\'ll work with stakeholders across the organization to understand their data needs and deliver clear, actionable insights through reports and visualizations.',
    responsibilities: [
      'Analyze large datasets to identify trends and patterns',
      'Create comprehensive reports and data visualizations',
      'Collaborate with business stakeholders to understand requirements',
      'Develop and maintain automated reporting systems',
      'Ensure data quality and integrity across all analyses',
      'Present findings to leadership and recommend actions'
    ],
    requirements: [
      '2+ years of experience in data analysis',
      'Strong proficiency in SQL and Python',
      'Experience with Tableau, Power BI, or similar visualization tools',
      'Knowledge of statistical analysis and modeling',
      'Strong attention to detail and problem-solving skills',
      'Excellent communication skills for presenting to non-technical audiences',
      'Bachelor\'s degree in Statistics, Mathematics, or related field'
    ],
    recruitmentProcess: 'Our process includes a technical screening (45 minutes), a data analysis case study (take-home), and an on-site interview with the analytics team (2 hours). We\'ll assess both your technical skills and your ability to communicate insights effectively.',
    recruiterEmail: 'erik.data@datainsights.se',
    recruiterPhone: '+46 40 123 789 01',
    companyLogo: 'D',
    featured: false
  },
  '5': {
    id: '5',
    title: 'Project Manager',
    company: 'BuildCorp',
    location: 'Uppsala',
    industry: 'Byggnad',
    omfattning: 'Heltid',
    salary: '500,000 - 650,000 SEK',
    summary: 'Lead construction projects from planning to completion while ensuring quality and timeline adherence.',
    aboutRole: 'Join BuildCorp as a Project Manager where you\'ll oversee construction projects from initial planning through final delivery. You\'ll coordinate with architects, contractors, and clients to ensure projects are completed on time, within budget, and to the highest quality standards. This role requires strong leadership skills and deep knowledge of construction processes.',
    responsibilities: [
      'Manage construction projects from start to finish',
      'Coordinate with architects, contractors, and subcontractors',
      'Monitor project timelines, budgets, and quality standards',
      'Conduct regular site inspections and safety assessments',
      'Communicate project status to clients and stakeholders',
      'Ensure compliance with building codes and regulations'
    ],
    requirements: [
      '5+ years of experience in construction project management',
      'PMP certification or equivalent project management qualification',
      'Strong knowledge of construction processes and building codes',
      'Experience with project management software (MS Project, Primavera)',
      'Excellent leadership and communication skills',
      'Ability to work under pressure and meet tight deadlines',
      'Engineering or Construction Management degree preferred'
    ],
    recruitmentProcess: 'We conduct a comprehensive interview process including a behavioral interview (1 hour), a technical assessment focused on project management scenarios (1.5 hours), and a site visit with our construction team (2 hours). We value practical experience and leadership capabilities.',
    recruiterEmail: 'lars.build@buildcorp.se',
    recruiterPhone: '+46 18 456 789 12',
    companyLogo: 'B',
    featured: true
  },
  '6': {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Stockholm',
    industry: 'Teknologi',
    omfattning: 'Heltid',
    salary: '580,000 - 750,000 SEK',
    summary: 'Automate and optimize our cloud infrastructure to support scalable, reliable applications.',
    aboutRole: 'As a DevOps Engineer at CloudTech, you\'ll be responsible for building and maintaining our cloud infrastructure that supports millions of users. You\'ll work with development teams to implement CI/CD pipelines, automate deployments, and ensure our systems are scalable, secure, and highly available.',
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage and optimize AWS cloud infrastructure',
      'Automate deployment and monitoring processes',
      'Ensure system security and compliance',
      'Troubleshoot and resolve infrastructure issues',
      'Collaborate with development teams on architecture decisions'
    ],
    requirements: [
      '4+ years of experience in DevOps or Site Reliability Engineering',
      'Strong experience with AWS services (EC2, ECS, RDS, Lambda)',
      'Proficiency with Docker and Kubernetes',
      'Experience with Infrastructure as Code (Terraform, CloudFormation)',
      'Knowledge of monitoring tools (Prometheus, Grafana, ELK stack)',
      'Strong scripting skills (Python, Bash)',
      'Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)'
    ],
    recruitmentProcess: 'Our technical interview process includes a system design discussion (1 hour), a hands-on technical assessment with real infrastructure scenarios (2 hours), and a cultural fit interview with the engineering team (45 minutes). We value both technical expertise and collaborative mindset.',
    recruiterEmail: 'sofia.cloud@cloudtech.se',
    recruiterPhone: '+46 8 789 123 45',
    companyLogo: 'C',
    featured: false
  },
  '7': {
    id: '7',
    title: 'Sales Representative',
    company: 'SalesForce Nordic',
    location: 'Göteborg',
    industry: 'Försäljning',
    omfattning: 'Heltid',
    salary: '380,000 - 480,000 SEK + provision',
    summary: 'Drive revenue growth by building strong customer relationships and closing strategic deals.',
    aboutRole: 'Join our dynamic sales team where you\'ll be responsible for developing new business opportunities and maintaining relationships with existing clients. You\'ll work in a fast-paced environment with excellent earning potential through our competitive commission structure.',
    responsibilities: [
      'Identify and pursue new business opportunities',
      'Build and maintain strong customer relationships',
      'Conduct product demonstrations and presentations',
      'Negotiate contracts and close deals',
      'Meet and exceed monthly and quarterly sales targets',
      'Collaborate with marketing team on lead generation'
    ],
    requirements: [
      '2+ years of B2B sales experience',
      'Proven track record of meeting sales targets',
      'Strong communication and negotiation skills',
      'Experience with CRM systems (Salesforce preferred)',
      'Self-motivated and results-oriented',
      'Ability to work independently and as part of a team',
      'Bachelor\'s degree in Business or related field'
    ],
    recruitmentProcess: 'Our sales interview process includes a phone screening (30 minutes), a role-play sales scenario (1 hour), and a final interview with the sales director (45 minutes). We\'re looking for driven individuals who can build relationships and close deals.',
    recruiterEmail: 'peter.sales@salesforcenordic.se',
    recruiterPhone: '+46 31 654 321 98',
    companyLogo: 'S',
    featured: true
  },
  '8': {
    id: '8',
    title: 'Frontend Developer',
    company: 'WebStudio',
    location: 'Remote',
    industry: 'Teknologi',
    omfattning: 'Deltid',
    salary: '2,500 - 3,500 SEK/dag',
    summary: 'Build beautiful, responsive web applications using modern frontend technologies.',
    aboutRole: 'As a Frontend Developer at WebStudio, you\'ll create stunning user interfaces for our diverse client portfolio. This part-time, remote position is perfect for developers who want flexibility while working on exciting projects with cutting-edge technologies.',
    responsibilities: [
      'Develop responsive web applications using React and modern CSS',
      'Collaborate with designers to implement pixel-perfect interfaces',
      'Optimize applications for performance and accessibility',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and team discussions',
      'Stay updated with latest frontend technologies and trends'
    ],
    requirements: [
      '3+ years of frontend development experience',
      'Strong proficiency in React and modern JavaScript',
      'Expert knowledge of HTML5, CSS3, and responsive design',
      'Experience with modern build tools (Webpack, Vite)',
      'Knowledge of version control systems (Git)',
      'Strong attention to detail and design sensibility',
      'Ability to work independently in a remote environment'
    ],
    recruitmentProcess: 'We start with a portfolio review, followed by a coding challenge (take-home), and a technical interview with our development team (1.5 hours). We value clean code, attention to detail, and the ability to work collaboratively in a remote setting.',
    recruiterEmail: 'anna.web@webstudio.se',
    recruiterPhone: '+46 70 987 654 32',
    companyLogo: 'W',
    featured: false
  }
};

const JobDetailPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate loading job data
    if (jobId && mockJobData[jobId as keyof typeof mockJobData]) {
      setJob(mockJobData[jobId as keyof typeof mockJobData]);
    }
    setIsVisible(true);
  }, [jobId]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-white/70 text-lg font-medium">Laddar tjänst...</p>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/jobs');
  };

  const handleApply = () => {
    window.open(`mailto:${job.recruiterEmail}?subject=Application for ${job.title}&body=Hello, I would like to apply for the ${job.title} position at ${job.company}.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className={`
            group flex items-center space-x-2 px-4 py-2 mb-8
            bg-white/10 border border-white/20 rounded-lg
            text-white/80 hover:text-white hover:bg-white/15
            transition-all duration-200
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ transitionDelay: '100ms' }}
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="text-sm font-medium">Back to jobs</span>
        </button>

        {/* Company Badge */}
        <div className={`
          inline-flex items-center space-x-3 px-4 py-2 mb-8
          bg-white/10 border border-white/20 rounded-full
          transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}
        style={{ transitionDelay: '200ms' }}
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
            {job.companyLogo}
          </div>
          <span className="text-white/90 text-sm font-medium">{job.company}</span>
          {job.featured && (
            <Sparkles size={12} className="text-yellow-400" />
          )}
        </div>

        {/* Page Title */}
        <div className={`
          mb-8
          transition-all duration-1000 delay-300 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
        `}>
          <h1 className="text-5xl font-bold text-white mb-2 leading-tight font-serif">
            {job.title}
          </h1>
          <h2 className="text-4xl font-light italic text-white/80 font-serif">
            at {job.company}
          </h2>
        </div>

        {/* Summary */}
        <p className={`
          text-lg text-white/70 mb-8 leading-relaxed max-w-3xl
          transition-all duration-1000 delay-400 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          {job.summary}
        </p>

        {/* Primary CTA */}
        <button
          onClick={handleApply}
          className={`
            w-full py-4 px-8 mb-8
            bg-gradient-to-r from-blue-600 to-purple-600
            text-white font-semibold text-lg rounded-xl
            hover:from-blue-700 hover:to-purple-700
            transition-all duration-200
            shadow-lg hover:shadow-xl
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ transitionDelay: '500ms' }}
        >
          Apply Here
        </button>

        {/* Attribute Bar */}
        <div className={`
          bg-white/10 border border-white/20 rounded-xl p-6 mb-16
          grid grid-cols-3 gap-6
          transition-all duration-1000 delay-600 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="text-center">
            <Clock size={20} className="text-white/60 mx-auto mb-2" />
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1">OMFATTNING</div>
            <div className="text-white font-bold font-serif">{job.omfattning}</div>
          </div>
          <div className="text-center">
            <MapPin size={20} className="text-white/60 mx-auto mb-2" />
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1">PLATS</div>
            <div className="text-white font-bold font-serif">{job.location}</div>
          </div>
          <div className="text-center">
            <Building size={20} className="text-white/60 mx-auto mb-2" />
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1">INDUSTRI</div>
            <div className="text-white font-bold font-serif">{job.industry}</div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          
          {/* About the Role */}
          <section className={`
            transition-all duration-1000 delay-700 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles size={20} className="text-blue-400" />
              <h2 className="text-2xl font-bold text-white font-serif">Om Rollen</h2>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <p className="text-white/80 leading-relaxed">
                {job.aboutRole}
              </p>
            </div>
          </section>

          {/* Responsibilities */}
          <section className={`
            transition-all duration-1000 delay-800 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle size={20} className="text-green-400" />
              <h2 className="text-2xl font-bold text-white font-serif">Ansvarsområden</h2>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-white/80 leading-relaxed">
                      {responsibility}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Requirements */}
          <section className={`
            transition-all duration-1000 delay-900 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <div className="flex items-center space-x-3 mb-6">
              <User size={20} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white font-serif">Vem Vi Söker</h2>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <ul className="space-y-3">
                {job.requirements.map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-white/80 leading-relaxed">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Recruitment Process */}
          <section className={`
            transition-all duration-1000 delay-1000 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <div className="flex items-center space-x-3 mb-6">
              <Zap size={20} className="text-orange-400" />
              <h2 className="text-2xl font-bold text-white font-serif">Vår Rekryteringsprocess</h2>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <p className="text-white/80 leading-relaxed">
                {job.recruitmentProcess}
              </p>
            </div>
          </section>

          {/* Questions */}
          <section className={`
            transition-all duration-1000 delay-1100 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles size={20} className="text-yellow-400" />
              <h2 className="text-2xl font-bold text-white font-serif">Har du frågor?</h2>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href={`mailto:${job.recruiterEmail}`}
                  className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Mail size={20} className="text-blue-400" />
                  <div>
                    <div className="text-white/60 text-sm">Email</div>
                    <div className="text-white font-medium">{job.recruiterEmail}</div>
                  </div>
                </a>
                
                <a 
                  href={`tel:${job.recruiterPhone}`}
                  className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Phone size={20} className="text-green-400" />
                  <div>
                    <div className="text-white/60 text-sm">Telefon</div>
                    <div className="text-white font-medium">{job.recruiterPhone}</div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Final CTA */}
        <button
          onClick={handleApply}
          className={`
            w-full py-4 px-8 mt-16
            bg-gradient-to-r from-blue-600 to-purple-600
            text-white font-semibold text-lg rounded-xl
            hover:from-blue-700 hover:to-purple-700
            transition-all duration-200
            shadow-lg hover:shadow-xl
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ transitionDelay: '1200ms' }}
        >
          Ansök Nu
        </button>
      </div>
    </div>
  );
};

export default JobDetailPage;