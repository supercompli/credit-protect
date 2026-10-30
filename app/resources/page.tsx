import type {Metadata} from 'next';
import Link from 'next/link';
import {Header,Footer,CTA} from '@/components/credit/shared';
import {resources,categories} from '@/lib/resources';

export const metadata:Metadata={title:'Resources',description:'Plain-language answers to the questions South Africans ask about credit life insurance: what it costs, what it covers, what happens if you die and how to switch or cancel.'};

export default function Page(){
  return <><Header/><main id="main-content" tabIndex={-1}>
    <section className="pagehero"><div className="wrap">
      <div className="breadcrumb"><Link href="/">Home</Link> / Resources</div>
      <span className="eyebrow">Resources</span>
      <h1>Credit life insurance, explained.</h1>
      <p>Plain-language answers to the questions South Africans ask most about credit life cover, what it costs and their rights.</p>
    </div></section>

    {categories.map((c,i)=>{
      const items=resources.filter(r=>r.category===c.id);
      return <section key={c.id} className={`section${i%2?' soft':''}`}><div className="wrap">
        <div className="section-heading"><h2>{c.title}</h2><p>{c.blurb}</p></div>
        <div className={items.length%3===0||items.length>=5?'cards':'cards two'}>{items.map(r=><Link key={r.slug} href={`/resources/${r.slug}`} className="card res-card">
          <h3>{r.question}</h3>
          <p>{r.description}</p>
          <span className="textlink">Read the answer</span>
        </Link>)}</div>
      </div></section>;
    })}

    <CTA/>
  </main><Footer/></>;
}
