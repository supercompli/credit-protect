import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Header,Footer,CTA} from '@/components/credit/shared';
import {Blocks,Inline} from '@/components/credit/resource-article';
import {resources,getResource,categories,sources,reviewed,type Resource} from '@/lib/resources';

const SITE_URL='https://creditcovered.co.za';

// Only the slugs in lib/resources.ts exist; anything else is a 404 instead of falling through to the catch-all page.
export const dynamicParams=false;
export const generateStaticParams=()=>resources.map(({slug})=>({slug}));

type Props={params:Promise<{slug:string}>};

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const r=getResource((await params).slug);
  return r?{title:r.question,description:r.description}:{};
}

// Same destinations as the other cover pages: a new enquiry, the existing-cover review, or the claims guidance.
const nextStep={
  quote:{heading:'Let’s explore your options.',text:'Start with a few details. An enquiry does not activate cover.',label:'Request a Quote',href:'/quote'},
  claims:{heading:'Need help finding the right claims route?',text:'Start with your policy documents. Our claims guidance explains the next step, and you can ask our team if you are unsure who to contact.',label:'Read Claims Guidance',href:'/claims'},
  review:{heading:'Review the cover you already have.',text:'Compare your current cover before you change or cancel anything. A new application is not confirmation of cover.',label:'Request a Review',href:'/quote?review=1'},
};

function structuredData(r:Resource){
  const url=`${SITE_URL}/resources/${r.slug}`;
  const org={'@type':'Organization',name:'CreditCovered',url:SITE_URL};
  return {'@context':'https://schema.org','@graph':[
    {'@type':'Article',headline:r.question,description:r.description,inLanguage:'en-ZA',dateModified:reviewed.iso,mainEntityOfPage:url,author:org,publisher:org},
    {'@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:SITE_URL},
      {'@type':'ListItem',position:2,name:'Resources',item:`${SITE_URL}/resources`},
      {'@type':'ListItem',position:3,name:r.question,item:url},
    ]},
  ]};
}

export default async function Page({params}:Props){
  const r=getResource((await params).slug);
  if(!r)notFound();
  const category=categories.find(c=>c.id===r.category);
  const step=nextStep[r.cta];
  const related=r.related.map(getResource).filter((x):x is Resource=>!!x);

  return <><Header/><main id="main-content" tabIndex={-1}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData(r)).replace(/</g,'\\u003c')}}/>
    <section className="pagehero"><div className="wrap">
      <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / {r.label}</div>
      <span className="eyebrow">{category?.title}</span>
      <h1>{r.question}</h1>
      <p className="res-meta">Last reviewed {reviewed.label}</p>
    </div></section>

    <section className="section"><div className="wrap res-layout">
      <article className="res-body">
        <div className="res-answer"><span className="label">The short answer</span><p><Inline text={r.short}/></p></div>
        {r.sections.map(s=><section key={s.h}><h2>{s.h}</h2><Blocks blocks={s.body}/></section>)}
        <div className="notice">General information only. It is not financial, legal or tax advice, and it is not a quotation. Your credit agreement and policy wording apply, and an enquiry does not start cover. The rules described here come from the National Credit Act and the Credit Life Insurance Regulations, which apply to credit agreements entered into on or after 10 August 2017. Older agreements may differ.</div>

        <section className="res-related"><h2>Related questions</h2>
          <ul>{related.map(x=><li key={x.slug}><Link href={`/resources/${x.slug}`}>{x.question}</Link></li>)}</ul>
        </section>

        <section className="res-sources"><h2>Sources</h2>
          <ul>{r.sources.map(k=><li key={k}><a href={sources[k].href} rel="noopener noreferrer">{sources[k].label}</a></li>)}</ul>
        </section>
      </article>

      <aside className="card res-aside">
        <span className="eyebrow">Your next step</span>
        <h3>{step.heading}</h3>
        <p>{step.text}</p>
        <Link className="btn" href={step.href}>{step.label}</Link>
        <div className="mt-5"><Link href="/contact" className="textlink">Speak to Us</Link></div>
        <div className="mt-5"><Link href="/resources" className="textlink">All resources</Link></div>
      </aside>
    </div></section>
    <CTA/>
  </main><Footer/></>;
}
