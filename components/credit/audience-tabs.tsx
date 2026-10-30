'use client';
import {useRef,useState,useSyncExternalStore,type KeyboardEvent,type ReactNode} from 'react';

type Tab='individuals'|'partners';
const TABS:{id:Tab;label:string}[]=[{id:'individuals',label:'For individuals'},{id:'partners',label:'For business partners'}];

const subscribeToHash=(onChange:()=>void)=>{window.addEventListener('hashchange',onChange);return ()=>window.removeEventListener('hashchange',onChange)};

/**
 * Switches between two journeys. Both panels stay in the page (the inactive one is
 * only hidden), so nothing is lost for search engines or print, and a link to
 * /how-it-works#partners opens the partner tab.
 */
export function AudienceTabs({individuals,partners}:{individuals:ReactNode;partners:ReactNode}){
  // Read from the URL hash without an effect: the server snapshot is '', so hydration matches.
  const hash=useSyncExternalStore(subscribeToHash,()=>window.location.hash,()=>'');
  const [chosen,setChosen]=useState<Tab|null>(null);
  const tab:Tab=chosen??(hash==='#partners'?'partners':'individuals');
  const buttons=useRef<Partial<Record<Tab,HTMLButtonElement|null>>>({});

  function select(next:Tab){
    setChosen(next);
    window.history.replaceState(null,'',next==='partners'?'#partners':window.location.pathname+window.location.search);
  }

  // Arrow keys, Home and End move between tabs, as the tabs pattern expects.
  function onKeyDown(event:KeyboardEvent<HTMLButtonElement>){
    const index=TABS.findIndex(t=>t.id===tab);
    let next=index;
    if(event.key==='ArrowRight')next=(index+1)%TABS.length;
    else if(event.key==='ArrowLeft')next=(index-1+TABS.length)%TABS.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=TABS.length-1;
    else return;
    event.preventDefault();
    select(TABS[next].id);
    buttons.current[TABS[next].id]?.focus();
  }

  return <div>
    <div className="mb-10 flex justify-center sm:mb-14">
      <div role="tablist" aria-label="Choose who this is for" className="inline-flex max-w-full rounded-full bg-[#e8eff1] p-1">
        {TABS.map(t=><button
          key={t.id}
          ref={el=>{buttons.current[t.id]=el;}}
          type="button"
          role="tab"
          id={`hiw-tab-${t.id}`}
          aria-selected={tab===t.id}
          aria-controls={`hiw-panel-${t.id}`}
          tabIndex={tab===t.id?0:-1}
          onClick={()=>select(t.id)}
          onKeyDown={onKeyDown}
          // The site's unlayered button{font:inherit} outranks utilities, hence the !important font sizes.
          className={`cursor-pointer rounded-full px-3.5 py-2.5 text-[13px]! font-bold! transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-6 sm:text-sm! ${tab===t.id?'bg-white text-foreground shadow-sm':'text-[#4d6672] hover:text-foreground'}`}
        >{t.label}</button>)}
      </div>
    </div>
    <div role="tabpanel" id="hiw-panel-individuals" aria-labelledby="hiw-tab-individuals" hidden={tab!=='individuals'}>{individuals}</div>
    <div role="tabpanel" id="hiw-panel-partners" aria-labelledby="hiw-tab-partners" hidden={tab!=='partners'}>{partners}</div>
  </div>;
}
