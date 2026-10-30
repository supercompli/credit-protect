import type {Metadata} from 'next';
import Link from 'next/link';
import {BadgeCheck,Building2,Check,CircleX,ClipboardList,Clock,FileCheck,FileSpreadsheet,ListChecks,SearchCheck,ShieldCheck,UserCheck,type LucideIcon} from 'lucide-react';
import {Header,Footer,CTA,FAQs} from '@/components/credit/shared';
import {AudienceTabs} from '@/components/credit/audience-tabs';

export const metadata:Metadata={title:'How it works',description:'A broker-led process, with time to understand your options. See each step from a first enquiry to an issued policy, for individuals and business partners.'};

// Every step is written from wording already used on the site (the quote form, FAQs and partner pages).
type Who='you'|'we';
type Step={who:Who;Icon:LucideIcon;title:string;text:string};

const individualSteps:Step[]=[
  {who:'you',Icon:ClipboardList,title:'Tell us about your credit agreement',text:'Complete a short enquiry with the type of agreement, outstanding balance, basic eligibility information and your contact details.'},
  {who:'we',Icon:SearchCheck,title:'We review your needs and eligibility',text:'The team reviews the enquiry and explains any additional information needed. This is not an acceptance or activation of cover.'},
  {who:'you',Icon:FileCheck,title:'Review your quotation and policy terms',text:'Check the benefits, premium, exclusions, waiting periods and conditions. Ask questions before making a decision.'},
  {who:'we',Icon:BadgeCheck,title:'Receive confirmation once cover is issued',text:'The broker processes the policy separately on the insurer platform and records the issued reference, premium, effective date and documents. The issued record is released after broker approval.'},
];
const glanceLabels=['Enquiry','Review','Quotation','Issued'];

const partnerSteps:Step[]=[
  {who:'you',Icon:Building2,title:'Apply for partner access',text:'Tell us about your organisation. Registration requires approval before you can use the workspace.'},
  {who:'we',Icon:UserCheck,title:'We review and approve your registration',text:'Our broker reviews your application. Access to the partner workspace follows approval.'},
  {who:'you',Icon:FileSpreadsheet,title:'Submit applications',text:'Use an individual form or a validated client spreadsheet. Confirm loan disbursement, consent and supporting information, and correct any row-level errors before submitting.'},
  {who:'we',Icon:ListChecks,title:'Broker review and insurer processing',text:'Applications move through broker review and manual insurer processing. You can see whether each one is submitted, awaiting information, under review or processing with the insurer.'},
  {who:'we',Icon:BadgeCheck,title:'Issued policies are released',text:'Once issuance evidence is recorded and approved, the issued record is released. Only broker-approved issued records are released as policies, and spreadsheet uploads never activate cover.'},
];

const chip=(who:Who)=>`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${who==='you'?'bg-[#e3f1f0] text-[#006b69]':'bg-[#102e40] text-white'}`;
const chipLabel=(who:Who)=>who==='you'?'Your step':'Our step';

function Timeline({steps}:{steps:Step[]}){
  return <ol className="relative space-y-5 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-[#cfe0e2] sm:space-y-6 sm:before:left-6">
    {steps.map(({who,Icon,title,text},i)=><li key={title} className="hiw-reveal relative flex gap-4 sm:gap-5">
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white ring-4 ring-white sm:h-12 sm:w-12 sm:text-lg">{i+1}</span>
      <div className="min-w-0 flex-1 rounded-2xl border border-[#dce6e8] bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e3f1f0] text-primary"><Icon size={18} aria-hidden="true"/></span>
          <span className={chip(who)}>{chipLabel(who)}</span>
        </div>
        <h3 className="text-xl font-bold leading-snug">{title}</h3>
        <p className="mt-2 text-[15px] leading-7 text-[#4d6672]">{text}</p>
      </div>
    </li>)}
  </ol>;
}

function Panel({eyebrow,title,text,primary,secondary,steps}:{eyebrow:string;title:string;text:string;primary:[string,string];secondary:[string,string];steps:Step[]}){
  return <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
    <div className="lg:sticky lg:top-8 lg:self-start">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-[17px] leading-8 text-[#4d6672]">{text}</p>
      <div className="actions"><Link className="btn" href={primary[1]}>{primary[0]}</Link><Link className="btn secondary" href={secondary[1]}>{secondary[0]}</Link></div>
    </div>
    <Timeline steps={steps}/>
  </div>;
}

const ready=['Your type of credit agreement','Your outstanding balance','Your employment status','Your contact details'];
const notAsked=['Medical history','Identity documents','Bank details'];
const goodToKnow:[LucideIcon,string,string][]=[
  [ShieldCheck,'An enquiry never starts cover','An enquiry, upload or application does not start cover. Check the insurer-issued policy and effective date, including any conditions that must be met.'],
  [FileCheck,'Benefits depend on the insurer’s terms','Benefits, eligibility, exclusions and commencement of cover depend on the insurer’s terms. Review benefit limits, exclusions and waiting periods in the actual policy.'],
  [Clock,'Time to understand your options','The process is broker-led, so you can ask questions and review the quotation and policy terms before you make a decision.'],
];

export default function Page(){
  return <><Header/><main id="main-content" tabIndex={-1}>
    <section className="bg-[#f1f6f7]"><div className="wrap grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
      <div>
        <div className="breadcrumb"><Link href="/">Home</Link> / How it works</div>
        <span className="eyebrow">How it works</span>
        <h1 className="mt-3 text-[38px] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[54px]">From a first question to a clear next step.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[#4d6672]">A broker-led process, with time to understand your options.</p>
        <div className="actions"><Link className="btn" href="/quote">Request a Quote</Link><Link className="btn secondary" href="/contact">Speak to Us</Link></div>
        <ul className="mt-8 flex flex-col gap-3 text-sm font-medium text-[#4d6672] sm:flex-row sm:flex-wrap sm:gap-x-6">
          {([[Clock,'About 2 minutes to start'],[ShieldCheck,'No medical history, ID or bank details at the start'],[FileCheck,'An enquiry never starts cover']] as [LucideIcon,string][]).map(([Icon,label])=><li key={label} className="flex items-center gap-2"><Icon size={17} className="shrink-0 text-primary" aria-hidden="true"/>{label}</li>)}
        </ul>
      </div>
      <div className="rounded-3xl border border-[#dce6e8] bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#627782]">Your journey at a glance</p>
        <ol className="mt-5 space-y-4">
          {individualSteps.map(({who},i)=><li key={glanceLabels[i]} className="flex items-center gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{i+1}</span>
            <span className="flex-1 text-lg font-bold">{glanceLabels[i]}</span>
            <span className={chip(who)}>{chipLabel(who)}</span>
          </li>)}
        </ol>
        <p className="mt-6 flex items-center gap-2 border-t border-[#e7edef] pt-5 text-sm text-[#4d6672]"><Clock size={16} className="shrink-0 text-primary" aria-hidden="true"/>The enquiry takes about 2 minutes.</p>
      </div>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="section-heading center"><span className="eyebrow">Choose your path</span><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See how it works for you</h2></div>
      <AudienceTabs
        individuals={<Panel eyebrow="For individuals" title="Four steps, one clear next step" text="An enquiry is only the first step. Cover is confirmed once the insurer-issued policy is recorded." primary={['Request a Quote','/quote']} secondary={['Speak to Us','/contact']} steps={individualSteps}/>}
        partners={<Panel eyebrow="For business partners" title="A shared, broker-led workflow" text="Credit providers, lenders and debt counsellors follow each application from submission to a broker-approved issued record." primary={['Become a Partner','/partners/apply']} secondary={['Partner overview','/partners']} steps={partnerSteps}/>}
      />
    </div></section>

    <section className="section soft"><div className="wrap">
      <div className="section-heading"><span className="eyebrow">Before you start</span><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What to have ready</h2></div>
      <div className="cards two">
        <div className="card"><h3 className="flex items-center gap-3 text-xl font-bold"><ListChecks size={22} className="text-primary" aria-hidden="true"/>What you’ll need</h3>
          <ul className="mt-5 space-y-3">{ready.map(item=><li key={item} className="flex items-center gap-3 text-[15px]"><Check size={18} className="shrink-0 text-primary" aria-hidden="true"/>{item}</li>)}</ul></div>
        <div className="card"><h3 className="flex items-center gap-3 text-xl font-bold"><ShieldCheck size={22} className="text-primary" aria-hidden="true"/>What we don’t ask for at the start</h3>
          <ul className="mt-5 space-y-3">{notAsked.map(item=><li key={item} className="flex items-center gap-3 text-[15px]"><CircleX size={18} className="shrink-0 text-[#627782]" aria-hidden="true"/>{item}</li>)}</ul>
          <p className="mt-5 text-sm text-[#627782]">None of these are requested in the initial enquiry.</p></div>
      </div>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="section-heading center"><span className="eyebrow">Good to know</span><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Clear from the start</h2></div>
      <div className="cards">{goodToKnow.map(([Icon,title,text])=><div key={title} className="card">
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e3f1f0] text-primary"><Icon size={22} aria-hidden="true"/></span>
        <h3 className="text-xl font-bold">{title}</h3><p className="mt-2">{text}</p>
      </div>)}</div>
    </div></section>

    <section className="section soft"><div className="wrap">
      <div className="section-heading center"><span className="eyebrow">FAQs</span><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Common questions</h2></div>
      <FAQs short/>
      <p className="mt-6 text-center"><Link className="textlink" href="/faq">See all frequently asked questions</Link></p>
    </div></section>

    <CTA/>
  </main><Footer/></>;
}
