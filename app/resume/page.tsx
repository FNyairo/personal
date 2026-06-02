import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import StarBackground from '@/components/StarBackground';
import { RESUME_SKY } from '@/lib/constellations';
import Footer from '@/components/Footer';
import ResumeNav from './ResumeNav';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Resume',
  description: 'A journey across continents, classrooms, and curricula — Franklin Nyairo\'s full academic and professional record.',
};

export default function ResumePage() {
  return (
    <>
      <StarBackground constellations={RESUME_SKY} />
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="section-container max-w-4xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-gradient-to-r from-electric-500 to-teal-500" />
                <span className="text-xs font-medium text-electric-400 uppercase tracking-widest">Curriculum Vitae</span>
              </div>
              <h1 className="font-serif text-5xl font-bold text-white">Franklin Nyairo</h1>
              <p className="text-slate-400 mt-2">
                franklin.nyairo@novia.fi · Vantaa, Finland · linkedin.com/in/spaceandortime
              </p>
            </div>
            <a href="/resume.pdf" download className="btn-primary">
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>

          <ResumeNav />

          {/* Profile */}
          <ResumeSection id="profile" title="Professional Profile">
            <p className="text-slate-400 leading-relaxed">
              Instructional designer, EdTech researcher, and maritime education instructor with combined expertise in EFL teacher education, TPACK-based curriculum design, and simulator-based maritime training. Currently completing a PhD at the University of Helsinki (TPACK, mixed methods, DBR) while managing EU-funded maritime education projects at Novia University of Applied Sciences. Incoming MSc student in Maritime Digital Solutions at TalTech (Aug 2026).
            </p>
          </ResumeSection>

          {/* Education */}
          <ResumeSection id="education" title="Education">
            {[
              {
                degree: 'PhD in Educational Sciences (in progress)',
                inst: 'University of Helsinki, Finland',
                years: '2020–2026',
                desc: 'Doctoral Programme in School, Education, Society, and Culture. Two-article mixed-methods / DBR dissertation examining TPACK development among EFL pre-service teachers in Finland and Kenya. Expected completion: July 2026.',
              },
              {
                degree: 'MSc Maritime Digital Solutions (incoming)',
                inst: 'Tallinn University of Technology (TalTech), Estonia',
                years: 'Aug 2026–',
                desc: 'Maritime data analytics, AI, IoT, Python. Thesis linked to Novia University of Applied Sciences maritime research agenda.',
              },
              {
                degree: 'MA Educational Sciences',
                inst: 'University of Turku, Finland',
                years: '2013',
                desc: 'Specialisation in curriculum studies, instructional design, and competence-based education.',
              },
              {
                degree: 'MA English Philology',
                inst: 'University of Helsinki, Finland',
                years: '2019',
                desc: 'Language acquisition, discourse analysis, second language writing, applied linguistics.',
              },
              {
                degree: 'Bachelor of Education (English)',
                inst: 'Kenyatta University, Kenya',
                years: '2002',
                desc: 'English and Literature pedagogy. Teaching practice in Kenyan secondary schools.',
              },
            ].map((edu) => (
              <TimelineItem key={edu.degree} title={edu.degree} subtitle={edu.inst} years={edu.years} desc={edu.desc} />
            ))}
          </ResumeSection>

          {/* Experience */}
          <ResumeSection id="experience" title="Professional Experience">
            {[
              {
                title: 'Project Manager & Instructor',
                org: 'Novia University of Applied Sciences, Vantaa, Finland',
                years: '2022–present',
                desc: 'Lead iMASTER (EU, AI-powered maritime training) and DigiMar (Erasmus+, digital maritime communication) projects. Develop blended learning modules for Maritime English aligned to STCW/SMCP. Teach Maritime English and evaluate simulator-based assessments. Administer Moodle-based LMS.',
              },
              {
                title: 'Doctoral Researcher',
                org: 'University of Helsinki, Finland',
                years: '2020–present',
                desc: 'Conduct mixed-methods DBR study on EFL teacher TPACK readiness in Finland and Kenya (TOTEMK project). Design instruments, administer surveys, conduct interviews, and perform statistical (SPSS/R) and qualitative analysis.',
              },
              {
                title: 'IMPACT Kenya – Research Coordinator',
                org: 'Novia University of Applied Sciences / Kenyan Partner Institutions',
                years: '2023–present',
                desc: 'Coordinate cross-institutional research supporting Kenyan CBC implementation. Support teacher education reform through TPACK-aligned professional development workshops.',
              },
              {
                title: 'English Language Instructor',
                org: 'Various institutions, Finland and Kenya',
                years: '2012–2022',
                desc: 'Taught EFL/ESP courses at secondary and tertiary level. Designed lesson sequences integrating technology (CALL, LMS, multimedia). Evaluated student writing and communicative competence.',
              },
            ].map((exp) => (
              <TimelineItem key={exp.title} title={exp.title} subtitle={exp.org} years={exp.years} desc={exp.desc} />
            ))}
          </ResumeSection>

          {/* Skills */}
          <ResumeSection id="skills" title="Skills & Tools">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { category: 'Research Methods', skills: ['Mixed methods', 'DBR', 'Survey design', 'Content analysis', 'SPSS', 'R', 'Stata'] },
                { category: 'Data & Analytics', skills: ['Python (learning)', 'Tableau', 'R Studio', 'SPSS', 'Excel/Sheets'] },
                { category: 'EdTech & LMS', skills: ['Moodle', 'ItsLearning', 'TipTap', 'Multimedia design', 'CALL'] },
                { category: 'Languages', skills: ['English (native)', 'Finnish (functional)', 'Swahili (native)', 'Spanish (beginner)'] },
                { category: 'Project Management', skills: ['EU project coordination', 'Erasmus+', 'PMBOK 7 (PMP in progress)', 'NetSuite ERP'] },
                { category: 'Finance & Accounting', skills: ['QuickBooks Online (certified)', 'Bookkeeping', 'Financial reporting', 'Accounts payable/receivable'] },
                { category: 'Productivity', skills: ['Microsoft 365', 'Teams', 'Flinga', 'LaTeX', 'APA 7'] },
              ].map((s) => (
                <div key={s.category} className="glass-card p-4">
                  <h4 className="text-sm font-semibold text-electric-400 mb-3">{s.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {s.skills.map((sk) => (
                      <span key={sk} className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10">{sk}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Publications */}
          <ResumeSection id="publications" title="Publications">
            {[
              { ref: 'Nyairo, F. (2026). Assessing Kenyan pre-service EFL teachers\' readiness for technology integration using the TPACK framework. European Journal of Education Studies, 13(5), 264–291. [Open Access]', doi: 'https://researchportal.helsinki.fi/en/publications/assessing-kenyan-pre-service-efl-teachers-readiness-for-technolog' },
              { ref: 'Munim, Z. H., Nyairo, F., et al. (2025). Predictive performance assessment in simulation training using machine learning. International Journal of Artificial Intelligence in Education. Springer.', doi: 'https://link.springer.com/article/10.1007/s40593-025-00464-y' },
              { ref: 'Nyairo, F., et al. (2024). Instructional approaches for simulator-based maritime education and training. Lecture Notes in Networks and Systems. Springer.', doi: 'https://link.springer.com/chapter/10.1007/978-3-031-84170-5_11' },
              { ref: 'Nyairo, F., & Nthia, J. (2025). Strengthening maritime education and training in Kenya. IMLA Conference Proceedings. International Maritime Lecturers\' Association.', doi: null },
            ].map((pub, i) => (
              <div key={i} className="border-l-2 border-electric-500/40 pl-4 py-1 mb-4">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {pub.doi ? (
                    <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-electric-400 transition-colors">
                      {pub.ref}
                    </a>
                  ) : pub.ref}
                </p>
              </div>
            ))}
          </ResumeSection>

          {/* Memberships */}
          <ResumeSection id="memberships" title="Memberships & Affiliations">
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>PMI – Project Management Institute</li>
              <li>EATEL – European Association of Technology Enhanced Learning</li>
              <li>IMLA – International Maritime Lecturers' Association</li>
              <li>Doctoral Programme in School, Education, Society, and Culture, University of Helsinki</li>
            </ul>
          </ResumeSection>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ResumeSection({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-12 scroll-mt-32">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-serif text-2xl font-bold text-white">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-electric-500/40 to-transparent" />
      </div>
      {children}
    </div>
  );
}

function TimelineItem({ title, subtitle, years, desc }: {
  title: string; subtitle: string; years: string; desc: string;
}) {
  return (
    <div className="relative pl-5 pb-8 border-l border-white/10 last:border-transparent">
      <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-gradient-to-br from-electric-500 to-teal-500" />
      <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
        <h3 className="font-serif font-semibold text-white">{title}</h3>
        <span className="text-xs text-electric-400 font-medium px-2 py-0.5 rounded-full bg-electric-500/10 border border-electric-500/20">
          {years}
        </span>
      </div>
      <p className="text-sm text-teal-400 mb-2">{subtitle}</p>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
