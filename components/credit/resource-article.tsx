import Link from 'next/link';
import type {Block} from '@/lib/resources';

// Renders the small inline markup used in lib/resources.ts: **bold** and [label](/path).
const token=/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function Inline({text}:{text:string}){
  return <>{text.split(token).map((part,i)=>{
    const bold=part.match(/^\*\*(.+)\*\*$/);
    if(bold)return <strong key={i}>{bold[1]}</strong>;
    const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if(link)return <Link key={i} href={link[2]}>{link[1]}</Link>;
    return part;
  })}</>;
}

export function Blocks({blocks}:{blocks:Block[]}){
  return <>{blocks.map((b,i)=>{
    if('p' in b)return <p key={i}><Inline text={b.p}/></p>;
    if('ul' in b)return <ul key={i}>{b.ul.map(t=><li key={t}><Inline text={t}/></li>)}</ul>;
    if('ol' in b)return <ol key={i}>{b.ol.map(t=><li key={t}><Inline text={t}/></li>)}</ol>;
    if('note' in b)return <div key={i} className="notice"><Inline text={b.note}/></div>;
    // The wrapper scrolls sideways on narrow screens, so it must be reachable by keyboard.
    return <div key={i} className="res-table-wrap" role="region" tabIndex={0} aria-label={`Table: ${b.table.head.join(', ')}`}>
      <table className="res-table">
        <thead><tr>{b.table.head.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{b.table.rows.map(([first,...rest])=><tr key={first}><th scope="row">{first}</th>{rest.map((c,j)=><td key={j}><Inline text={c}/></td>)}</tr>)}</tbody>
      </table>
    </div>;
  })}</>;
}
