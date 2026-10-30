import Link from 'next/link';
import {PageHero} from './shared';

// Shown in place of the partner and broker login while PORTAL_ENABLED is off.
export function ComingSoon(){
  return <>
    <PageHero label="Partner login" title="Partner login is coming soon." description="Secure accounts for credit providers and debt counsellors are on the way."/>
    <div className="form-shell">
      <div className="form-card text-center">
        <h2>Not open yet</h2>
        <p>You can apply to become a partner now. We will be in touch once your organisation is approved and accounts are open.</p>
        <div className="form-actions">
          <Link className="btn" href="/partners/apply">Become a Partner</Link>
          <Link className="btn secondary" href="/contact">Speak to Us</Link>
        </div>
      </div>
    </div>
  </>;
}
