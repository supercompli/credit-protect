import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {BadgeCheck,Building2,Check,Clock,ListChecks,MessagesSquare,ShieldCheck,UserCheck,UserRound,type LucideIcon} from 'lucide-react';
import {Header,Footer,CTA} from '@/components/credit/shared';

export const metadata:Metadata={title:'About us',description:'CreditCovered helps South Africans understand credit life cover, with plain-language guidance and a broker-led application process. Meet the principles behind how we work.'};

// Facts below repeat wording already used on the home, How it works, FAQ and Resources pages.
// Photos are free-licence images from Unsplash, stored in /public/about so the site serves them itself.
const facts:[LucideIcon,string,string][]=[
  [Clock,'About 2 minutes','to start an enquiry'],
  [ShieldCheck,'Nothing sensitive up front','No medical history, ID or bank details in the first enquiry'],
  [BadgeCheck,'Broker-approved','Issued policy records are released only after broker approval'],
];

const principles:[LucideIcon,string,string][]=[
  [MessagesSquare,'Plain language first','We explain benefits, exclusions and waiting periods without jargon, so you know what you are looking at before you decide.'],
  [UserCheck,'People stay in the loop','A broker reviews the information and processes issuance separately on the insurer platform. Nothing is issued automatically.'],
  [ShieldCheck,'Honest about cover','An enquiry, upload or application does not start cover. Cover is confirmed once the insurer-issued policy is recorded.'],
  [ListChecks,'Only what we need','We start with a few details about your credit agreement. We do not ask for medical history, identity documents or bank details in the first enquiry.'],
];

const brokerSteps=[
  'Reviews your enquiry and explains any extra information needed',
  'Processes the policy manually on the insurer’s platform',
  'Records the issued reference, premium, effective date and documents',
  'Releases the issued record only after broker approval',
];

const trustLinks:[string,string,string][]=[
  ['Complaints','/complaints','How to raise a concern with us'],
  ['Privacy','/privacy','How we handle your information'],
  ['Disclosures','/disclosures','Regulatory and service disclosures'],
  ['Claims guidance','/claims','Where to start if you need to claim'],
];

const credits:[string,string][]=[
  ['Trust “Tru” Katsande','https://unsplash.com/photos/sc5TYeefOTI'],
  ['Iwaria Inc.','https://unsplash.com/photos/U7zb_4mTVPQ'],
  ['Christina @ wocintechchat.com','https://unsplash.com/photos/UcZcsHSp8o4'],
];

const jsonLd={
  '@context':'https://schema.org',
  '@graph':[
    {'@type':'AboutPage',name:'About CreditCovered',url:'https://creditcovered.co.za/about',description:'CreditCovered helps South Africans understand credit life cover, with plain-language guidance and a broker-led application process.',isPartOf:{'@type':'WebSite',name:'CreditCovered',url:'https://creditcovered.co.za'}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://creditcovered.co.za'},{'@type':'ListItem',position:2,name:'About us',item:'https://creditcovered.co.za/about'}]},
  ],
};

export default function Page(){
  return <><Header/><main id="main-content" tabIndex={-1}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/>

    <section className="ab-hero"><div className="wrap ab-hero-grid">
      <div>
        <div className="breadcrumb"><Link href="/">Home</Link> / About us</div>
        <span className="eyebrow">About CreditCovered</span>
        <h1>We make credit life cover easier to understand.</h1>
        <p className="ab-lead">CreditCovered helps South Africans explore credit life insurance for eligible loans and credit agreements, with plain-language guidance and a broker-led application process.</p>
        <div className="actions"><Link className="btn" href="/quote">Request a Quote</Link><Link className="btn secondary" href="/contact">Speak to Us</Link></div>
      </div>
      <div className="ab-hero-art">
        <div className="ab-photo ab-hero-photo"><Image src="/about/family-at-home.webp" width={1399} height={932} priority sizes="(max-width: 1050px) 92vw, 540px" alt="A mother on a sofa smiling down at her baby son and young daughter, who lean in close to her"/></div>
        <div className="art-note"><div className="iconbox"><UserCheck size={24} aria-hidden="true"/></div><div><strong>A person reviews every application</strong><span>Cover is never issued automatically.</span></div></div>
      </div>
    </div></section>

    <div className="wrap"><ul className="ab-facts" aria-label="At a glance">
      {facts.map(([Icon,title,text])=><li key={title} className="ab-fact"><span className="iconbox"><Icon size={22} aria-hidden="true"/></span><div><strong>{title}</strong><span>{text}</span></div></li>)}
    </ul></div>

    <section className="section"><div className="wrap ab-split">
      <div className="ab-photo"><Image src="/about/plain-conversation.webp" width={1399} height={932} sizes="(max-width: 1050px) 92vw, 540px" alt="Two people talking on a sofa, gesturing as one explains something to the other"/></div>
      <div className="ab-text">
        <span className="eyebrow">Why we exist</span>
        <h2 className="ab-h2">Credit life shouldn’t need a translator.</h2>
        <p>Credit life insurance often arrives alongside a personal loan, vehicle finance or a home loan. The benefits, exclusions and waiting periods can be hard to read, and it is not always clear what you are entitled to ask.</p>
        <p>CreditCovered exists to change that. We explain how credit life works in plain language, help you understand your options, and support you through the application, so you can decide at your own pace.</p>
        <div className="ab-promise"><span className="iconbox"><MessagesSquare size={22} aria-hidden="true"/></span><div><strong>Our promise</strong><p>Clear explanations, honest next steps and a straight answer about when your cover begins.</p></div></div>
        <Link className="textlink" href="/resources">Read our plain-language guides</Link>
      </div>
    </div></section>

    <section className="section soft"><div className="wrap">
      <div className="section-heading center"><span className="eyebrow">How we work</span><h2 className="ab-h2" style={{marginInline:'auto'}}>Four principles we work by</h2></div>
      <div className="ab-grid4">{principles.map(([Icon,title,text])=><div key={title} className="card ab-reveal">
        <span className="iconbox"><Icon size={22} aria-hidden="true"/></span>
        <h3>{title}</h3><p>{text}</p>
      </div>)}</div>
    </div></section>

    <section className="section"><div className="wrap ab-split">
      <div className="ab-text">
        <span className="eyebrow">Human review remains central</span>
        <h2 className="ab-h2">A real person checks the details.</h2>
        <p>Behind every application is a broker who reads what has been submitted, asks for anything that is missing and processes the policy with the insurer. That is deliberate: it gives you time to ask questions and review the quotation and policy terms before you make a decision.</p>
        <ul className="ab-checks">{brokerSteps.map(s=><li key={s}><Check size={18} aria-hidden="true"/>{s}</li>)}</ul>
        <Link className="textlink" href="/how-it-works">See the full process</Link>
      </div>
      <div className="ab-photo"><Image src="/about/broker-review.webp" width={1399} height={932} sizes="(max-width: 1050px) 92vw, 540px" alt="Three colleagues around a meeting table with laptops, listening as one of them speaks"/></div>
    </div></section>

    <section className="section soft"><div className="wrap ab-split">
      <div>
        <span className="eyebrow">Who we help</span>
        <h2 className="ab-h2">Built for borrowers and the partners who support them.</h2>
        <div className="ab-aud" style={{marginTop:32}}>
          <div className="ab-aud-item">
            <span className="iconbox"><UserRound size={22} aria-hidden="true"/></span>
            <div><h3>For individuals</h3><p>Explore credit life cover for an eligible personal loan, vehicle finance or home loan, or review the cover you already have.</p>
              <div className="ab-links"><Link className="textlink" href="/credit-life-insurance">Explore my options</Link><Link className="textlink" href="/existing-credit-life-cover">Review existing cover</Link></div></div>
          </div>
          <div className="ab-aud-item">
            <span className="iconbox"><Building2 size={22} aria-hidden="true"/></span>
            <div><h3>For business partners</h3><p>Credit providers, lenders and debt counsellors can submit applications one by one or in bulk, and follow each one to a broker-approved record.</p>
              <div className="ab-links"><Link className="textlink" href="/partners">Partner overview</Link><Link className="textlink" href="/partners/apply">Become a partner</Link></div></div>
          </div>
        </div>
      </div>
      <div className="ab-photo"><Image src="/about/partner-collaboration.webp" width={1399} height={932} sizes="(max-width: 1050px) 92vw, 540px" alt="Three women on a sofa with a laptop and notebooks, talking through their work together"/></div>
    </div></section>

    <section className="section"><div className="wrap ab-trust">
      <div className="ab-text">
        <span className="eyebrow">Transparency</span>
        <h2 className="ab-h2">Who you’re dealing with.</h2>
        <p>CreditCovered is a division of Covered Financial Services (Pty) Ltd, an authorised Financial Services Provider (FSP 54871).</p>
        <p>Benefits, eligibility, exclusions and commencement of cover depend on the insurer’s terms. An enquiry or application does not confirm insurance cover.</p>
      </div>
      <nav className="ab-trust-card ab-linklist" aria-label="Policies and support">{trustLinks.map(([label,href,hint])=><Link key={href} href={href}><span><strong>{label}</strong><small>{hint}</small></span></Link>)}</nav>
    </div></section>

    <CTA/>

    <div className="wrap"><p className="fine ab-credits">Photography from Unsplash by {credits.map(([name,href],i)=><span key={href}>{i>0&&(i===credits.length-1?' and ':', ')}<a href={href}>{name}</a></span>)}.</p></div>
  </main><Footer/></>;
}
