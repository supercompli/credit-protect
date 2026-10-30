// Resources: plain-language answers to common credit life questions.
// The rules described here come from section 106 of the National Credit Act, the Credit Life
// Insurance Regulations, 2017 and the NCR guidelines listed in `sources`. Re-check them against
// those documents before changing a figure or a claim.
// Inline markup is allowed in any string: **bold** and [label](/internal-path).

export type Table={head:string[];rows:string[][]};
export type Block={p:string}|{ul:string[]}|{ol:string[]}|{table:Table}|{note:string};
export type Section={h:string;body:Block[]};
export type CategoryId='basics'|'type'|'covered'|'death'|'switching';
export type SourceKey='nca106'|'nca92'|'regs'|'ncr2024'|'ncr2026'|'ncrDebtReview'|'pprCreditLife'|'pprClaims';
export type Resource={
  slug:string;
  question:string;
  // Short form used in the breadcrumb.
  label:string;
  category:CategoryId;
  // Meta description, also shown on the hub card.
  description:string;
  // The short answer shown first on the page.
  short:string;
  sections:Section[];
  related:string[];
  sources:SourceKey[];
  // 'review' sends the reader to the existing-cover review flow, 'quote' to a new enquiry and 'claims' to the claims guidance.
  cta:'quote'|'review'|'claims';
};

export const reviewed={iso:'2026-10-02',label:'2 October 2026'};

export const categories:{id:CategoryId;title:string;blurb:string}[]=[
  {id:'basics',title:'The basics',blurb:'What credit life is, what it costs, whether you have to take it and how to find out if you already have it.'},
  {id:'type',title:'By type of credit',blurb:'How credit life works for personal loans, vehicle finance, home loans and cards, and what to know under debt review.'},
  {id:'covered',title:'Cover, claims and payouts',blurb:'What the benefits pay, what is excluded, how to claim and who is paid.'},
  {id:'death',title:'If you die',blurb:'What happens to a loan, car finance or bond, with and without cover.'},
  {id:'switching',title:'Switching and cancelling',blurb:'Your rights if you want to change, replace or cancel your cover.'},
];

export const sources:Record<SourceKey,{label:string;href:string}>={
  nca106:{label:'National Credit Act 34 of 2005, section 106: credit insurance',href:'https://www.acts.co.za/national-credit-act-2005/106__credit_insurance'},
  regs:{label:'Credit Life Insurance Regulations, 2017 (Government Gazette 40606, Notice 103)',href:'https://www.gov.za/sites/default/files/gcis_document/201702/40606gon103.pdf'},
  ncr2024:{label:'NCR Guideline 003/2024: application of the Credit Life Insurance Regulations (June 2024)',href:'https://www.ncr.org.za/documents/GUIDELINE%20ON%20THE%20APPLICATION%20OF%20THE%20CREDIT%20LIFE%20INSURANCE%20REGULATIONS.pdf'},
  ncr2026:{label:'NCR Interpretation Guideline 002/2026: Regulation 3(1) read with section 106 (March 2026)',href:'https://ncr.org.za/documents/Guidelines/Guideline%202%20March%202026.pdf'},
  nca92:{label:'National Credit Act 34 of 2005, section 92: pre-agreement disclosure',href:'https://www.acts.co.za/national-credit/92__pre_agreement_disclosure'},
  ncrDebtReview:{label:'NCR Debt Review Task Team Agreements guidelines for debt counsellors (2015)',href:'https://www.ncr.org.za/documents/pages/circulars/feb2015/TTA%20Guidelines%20Final%20.pdf'},
  pprCreditLife:{label:'Policyholder Protection Rules (Long-term Insurance): Rule 3, credit life insurance',href:'https://www.acts.co.za/long-term-/n1407_rule_3__credit_life_insu'},
  pprClaims:{label:'Policyholder Protection Rules (Long-term Insurance): Rule 17, claims management',href:'https://www.acts.co.za/long-term-/n1407_rule_17__claims_manageme'},
};

const raw:Resource[]=[
  {
    slug:'what-is-credit-life-insurance',
    question:'What is credit life insurance?',
    label:'What is credit life insurance?',
    category:'basics',
    description:'Credit life insurance explained for South Africans: what it covers, how it differs from ordinary life cover and what to check before you agree.',
    short:'Credit life insurance is cover linked to one loan or credit agreement. If an insured event happens, such as death or permanent disability, the insurer pays your credit provider to settle the outstanding balance. Other events, such as temporary disability or losing your job, may instead cover your repayments for a limited time.',
    sections:[
      {h:'How it works',body:[
        {p:'Credit life insurance is tied to a single credit agreement, such as a personal loan, vehicle finance, a home loan (bond), a store account or a credit card. You pay a monthly premium, often added to your repayment. If an insured event happens and your claim is valid, the insurer pays the credit provider, not your family.'},
        {p:'That is why it is called credit life: the cover exists to deal with a debt, and it generally follows the debt. As the balance you owe goes down, the amount insured should go down with it.'},
      ]},
      {h:'What it can cover',body:[
        {ul:[
          '**Death:** the policy settles the outstanding balance of your obligations under the agreement.',
          '**Permanent disability:** the policy settles the outstanding balance in the same way.',
          '**Temporary disability:** the policy pays the repayments that fall due while you cannot work, for a limited period.',
          '**Unemployment or inability to earn an income:** in certain circumstances, such as involuntary retrenchment, the policy pays your repayments for a limited period.',
        ]},
        {p:'For credit life that a credit provider requires you to keep, the Credit Life Insurance Regulations set these as the minimum benefits. At the legal minimum, the temporary disability and unemployment benefits pay your repayments for up to 12 months, not the whole debt. Some insurers offer more, so read your policy. For the detail, see [credit life and disability](/resources/does-credit-life-insurance-cover-disability) and [credit life and retrenchment](/resources/does-credit-life-cover-retrenchment).'},
      ]},
      {h:'How it differs from ordinary life cover',body:[
        {table:{head:['Feature','Credit life insurance','Ordinary life cover'],rows:[
          ['Who is paid','Your credit provider','The beneficiaries you choose'],
          ['What it pays','The balance on one debt, or its repayments for a limited time','A lump sum or income that you choose'],
          ['How the amount changes','Generally follows the balance you owe','Stays as set unless you change it'],
          ['Main purpose','Dealing with a specific debt','Supporting your family in general'],
        ]}},
        {p:'The two can work together. Credit life deals with the debt, and ordinary life cover can then be used for everything else your family needs.'},
      ]},
      {h:'What it does not do',body:[
        {ul:[
          'It does not pay out for every event. Policies have exclusions and, in some cases, waiting periods.',
          'It is not motor insurance, buildings insurance or shortfall cover. Each of those covers something different.',
          'It does not cover debts it is not linked to.',
          'An enquiry or application does not start cover. Check the insurer-issued policy and its effective date.',
        ]},
      ]},
      {h:'What to check before you agree',body:[
        {ul:[
          'Which events are covered, and whether each one settles the balance or only your repayments.',
          'Waiting periods, exclusions and any limits on the benefit.',
          'The premium, and whether it is worked out on your original balance or on what you owe from time to time. See [how credit life insurance is calculated](/resources/how-is-credit-life-insurance-calculated).',
          'Whether your credit provider requires the cover, and your right to use a policy of your own choice. See [is credit life insurance compulsory?](/resources/is-credit-life-insurance-compulsory)',
        ]},
      ]},
    ],
    related:['how-much-does-credit-life-insurance-cost','is-credit-life-insurance-compulsory','credit-life-insurance-vs-life-insurance','what-happens-to-my-loan-if-i-die'],
    sources:['regs','nca106'],
    cta:'quote',
  },

  {
    slug:'how-much-does-credit-life-insurance-cost',
    question:'How much does credit life insurance cost?',
    label:'How much does it cost?',
    category:'basics',
    description:'What credit life insurance can cost in South Africa, the legal monthly ceilings per R1 000 and what to ask your credit provider.',
    short:'There is no single price. What you pay depends on the type of credit, the amount insured, the benefits included and the insurer. For credit life that your credit provider requires, the regulations set a monthly ceiling per R1 000: R4.50 for most credit and R2 for most home loans.',
    sections:[
      {h:'The legal ceilings',body:[
        {p:'For credit life that a credit provider requires you to keep, Regulation 3 of the Credit Life Insurance Regulations sets the most that can be charged each month for each person insured. The ceiling includes any commission, fees and expenses.'},
        {table:{head:['Type of credit','Maximum per month','Calculated on'],rows:[
          ['Home loans, other than affordable housing','R2 per R1 000','The deferred amount'],
          ['Affordable housing home loans (a defined category of smaller home loans)','R2 per R1 000 if you are under 55, R2.50 if you are over 55','The deferred amount'],
          ['Credit facilities, such as credit cards and store accounts','R4.50 per R1 000','Your average use of the credit limit in the billing cycle'],
          ['All other credit, including personal loans and vehicle finance','R4.50 per R1 000','The deferred amount'],
        ]}},
        {note:'These are ceilings, not typical prices. The cost must also reflect the actual risk, and a provider that raises its premiums to the maximum must be able to show the National Credit Regulator why.'},
      ]},
      {h:'Extra benefits can raise the ceiling',body:[
        {p:'If a policy goes beyond the minimum and settles your total obligations when you are temporarily disabled or unable to earn an income, the ceiling may rise by up to R1 per R1 000. A credit provider cannot force you to take those extra benefits.'},
      ]},
      {h:'What affects your actual cost',body:[
        {ul:[
          '**Type of credit.** Home loans have a lower ceiling than other credit.',
          '**Amount insured.** The premium is a rate per R1 000, so a larger insured amount costs more. See [how credit life insurance is calculated](/resources/how-is-credit-life-insurance-calculated).',
          '**Benefits included.** If you were not employed when cover began, you cannot be charged for unemployment cover. If you were already a pensioner, you cannot be charged for occupational disability cover.',
          '**Your age.** The regulations set age bands only for affordable housing home loans, where the ceiling is higher once you are over 55.',
          '**The provider and insurer.** Each sets its own pricing within the ceiling.',
        ]},
      ]},
      {h:'How to find out what you are paying',body:[
        {ol:[
          'Look for the insurance premium on your credit agreement, quotation or statement.',
          'Ask your credit provider for the rate per R1 000, the amount it is charged on and the benefits included.',
          'Ask for the exclusions and waiting periods in writing. Your provider must explain the exclusions when you sign and again at regular intervals.',
          'Compare the total cost over the whole term, not only the monthly figure.',
        ]},
      ]},
      {h:'The cheapest policy is not always the best',body:[
        {p:'A lower premium can come with a longer waiting period, more exclusions or a shorter benefit. If you are thinking of replacing required cover, the new policy must still provide at least the minimum benefits. See [can I replace my bank’s credit life insurance?](/resources/can-i-replace-my-banks-credit-life-insurance)'},
      ]},
    ],
    related:['how-is-credit-life-insurance-calculated','is-credit-life-insurance-compulsory','credit-life-insurance-for-personal-loans','can-i-replace-my-banks-credit-life-insurance'],
    sources:['regs','ncr2026'],
    cta:'quote',
  },

  {
    slug:'is-credit-life-insurance-compulsory',
    question:'Is credit life insurance compulsory?',
    label:'Is it compulsory?',
    category:'basics',
    description:'No law forces you to buy credit life insurance, but a credit provider may require it. Here is what you can and cannot be asked to do.',
    short:'No law forces you to take credit life insurance, but the National Credit Act lets a credit provider make it a condition of your credit agreement. If cover is required, you generally do not have to buy the provider’s own policy: you can substitute a compliant policy of your own choice.',
    sections:[
      {h:'What the law says',body:[
        {p:'Section 106(1) of the National Credit Act allows a credit provider to require you to maintain credit life insurance for the term of your credit agreement. The cover may not exceed what you owe the provider at any time during the agreement.'},
        {p:'Section 106(2) adds a limit: a credit provider must not offer or demand insurance that is unreasonable, or that costs an unreasonable amount given the actual risk in the agreement.'},
      ]},
      {h:'Required cover and optional cover',body:[
        {table:{head:['Point','Required cover','Optional cover'],rows:[
          ['What it means','Your credit agreement says you must keep credit life for its term','It is offered as an add-on and you can say no'],
          ['Can you simply cancel it?','No. You must replace it with a compliant policy first','Yes, with notice and subject to your policy terms'],
          ['Regulated ceilings and minimum benefits','Yes, the Credit Life Insurance Regulations apply','Check the policy terms and ask what is included'],
        ]}},
        {p:'To find out which applies to you, read your credit agreement and quotation for wording such as “you must maintain”. If it is not clear, ask your credit provider to confirm in writing.'},
      ]},
      {h:'You still have a choice of insurer',body:[
        {p:'If a credit provider proposes a particular policy, section 106(4) says you must be told that you can waive it and substitute a policy of your own choice. The National Credit Regulator’s guidance is that the provider must accept your policy if it meets the minimum benefit and limitation rules. See [can I change my credit life insurer?](/resources/can-i-change-my-credit-life-insurer)'},
      ]},
      {h:'What cannot be forced on you',body:[
        {ul:[
          'Cover that exceeds the amount you owe.',
          'Insurance that is unreasonable, or priced unreasonably, given the actual risk.',
          'The extra temporary disability and loss-of-income benefits that raise the cost ceiling.',
          'A charge for unemployment cover if you were not employed when the policy began.',
        ]},
      ]},
      {h:'Before you sign',body:[
        {ul:[
          'Ask whether the cover is required or optional.',
          'Ask for the premium, how it is calculated and what it includes.',
          'Ask for your right to use your own policy in writing.',
          'Do not sign until you understand the waiting periods and exclusions.',
        ]},
      ]},
    ],
    related:['can-i-change-my-credit-life-insurer','can-i-cancel-credit-life-insurance','how-do-i-know-if-i-already-have-credit-life-insurance','what-is-credit-life-insurance'],
    sources:['nca106','regs','ncr2024'],
    cta:'quote',
  },

  {
    slug:'can-i-cancel-credit-life-insurance',
    question:'Can I cancel credit life insurance?',
    label:'Can I cancel it?',
    category:'switching',
    description:'Whether you can cancel credit life insurance in South Africa depends on whether it is required. Learn the steps and what to check first.',
    short:'It depends on whether your credit agreement requires the cover. Optional cover can usually be cancelled with notice, subject to your policy terms. Required cover cannot simply be dropped: you need to replace it with another compliant policy first.',
    sections:[
      {h:'First, is your cover required or optional?',body:[
        {p:'Your credit agreement or quotation should say whether you must keep credit life for the term of the loan. If it does, see the section on required cover below. If the cover was offered as an extra, it is optional. If you are unsure, ask your credit provider to confirm in writing. See [is credit life insurance compulsory?](/resources/is-credit-life-insurance-compulsory)'},
      ]},
      {h:'If the cover is optional',body:[
        {ol:[
          'Read your policy for the notice period and how to cancel.',
          'If you took the cover recently, check for a cooling-off period. Many long-term insurance policies give 31 days, but your policy document states the exact period and any refund.',
          'Cancel in writing and keep proof that you did.',
          'Confirm the date the last premium will be taken, and ask what refund, if any, applies.',
        ]},
        {p:'Remember what you are giving up. Without cover, your family, estate or any co-borrower remains responsible for the debt if something happens to you.'},
      ]},
      {h:'If the cover is required',body:[
        {p:'You cannot simply cancel it. Cancelling without a replacement may put you in breach of your credit agreement. What you can do is substitute a policy of your own choice, and the credit provider must accept it if it provides at least the minimum benefits. See [can I change my credit life insurer?](/resources/can-i-change-my-credit-life-insurer) and [can I replace my bank’s credit life insurance?](/resources/can-i-replace-my-banks-credit-life-insurance)'},
      ]},
      {h:'Before you cancel anything',body:[
        {ul:[
          'Check that no claim is pending and that no insured event has already happened.',
          'If you are replacing the policy, wait until the new insurer has accepted you and the credit provider has confirmed, so there is no gap in cover.',
          'Remember that a new policy may start new waiting periods and may exclude conditions you already have.',
          'Ask for written confirmation of the cancellation.',
        ]},
      ]},
      {h:'When you settle the loan',body:[
        {p:'Credit life is linked to the debt, so it normally comes to an end when you settle the agreement. If you pay the loan off early, check that the premium stops and ask whether any refund is due.'},
      ]},
    ],
    related:['can-i-change-my-credit-life-insurer','can-i-replace-my-banks-credit-life-insurance','is-credit-life-insurance-compulsory'],
    sources:['nca106','regs'],
    cta:'review',
  },

  {
    slug:'can-i-change-my-credit-life-insurer',
    question:'Can I change my credit life insurer?',
    label:'Can I change my insurer?',
    category:'switching',
    description:'Yes. South African law lets you substitute a credit life policy of your choice at any time. See the rules, what the new policy must cover and what can change.',
    short:'Yes. Section 106(4) of the National Credit Act gives you the right to waive the policy your credit provider proposes and substitute one of your own choice. Under Regulation 7 you can do this at any time after the credit agreement starts, and the provider must accept the new policy if it provides at least the minimum benefits.',
    sections:[
      {h:'Your right to switch',body:[
        {p:'Regulation 7 of the Credit Life Insurance Regulations says you may substitute a credit life policy of your choice at any time after the credit agreement is entered into. The credit provider must accept it, provided the new policy offers at least the benefits in Regulation 3.'},
        {p:'You must give the credit provider the details of the new insurer within 5 business days of taking up the new policy. The National Credit Regulator’s 2024 guideline confirms that the provider must also tell you about these rules in writing.'},
        {note:'The regulations apply to credit agreements entered into on or after 10 August 2017. If your agreement is older, ask your credit provider what applies.'},
      ]},
      {h:'What the new policy must provide',body:[
        {p:'At the legal minimum, a policy for required credit life must provide for:'},
        {ul:[
          '**Death or permanent disability:** settlement of the outstanding balance of your obligations.',
          '**Temporary disability:** payment of the obligations that fall due for up to 12 months, the rest of the agreement, or until you are no longer disabled, whichever is shortest.',
          '**Unemployment or inability to earn an income:** payment of the obligations that fall due for up to 12 months, the rest of the agreement, or until you find work or can earn again, whichever is shortest.',
        ]},
        {p:'Your credit provider may also ask for written directions and for its interest to be recorded on the new policy, so that any payout goes to it.'},
      ]},
      {h:'What can change when you switch',body:[
        {ul:[
          '**New waiting periods.** A disability waiting period of up to 3 months can apply to a new policy, and a retrenchment in the first 3 months after cover starts can be excluded.',
          '**New exclusions.** A condition you knew about in the 12 months before the new cover began can be excluded.',
          '**A different premium basis.** The new insurer may calculate the premium differently. See [how credit life insurance is calculated](/resources/how-is-credit-life-insurance-calculated).',
          '**Eligibility.** Age and employment status when the new cover starts can affect what you are covered for.',
        ]},
      ]},
      {h:'Switching safely',body:[
        {p:'Do not cancel your existing policy until the new one has been accepted and your credit provider has confirmed. For a step-by-step list, see [can I replace my bank’s credit life insurance?](/resources/can-i-replace-my-banks-credit-life-insurance)'},
      ]},
    ],
    related:['can-i-replace-my-banks-credit-life-insurance','can-i-cancel-credit-life-insurance','is-credit-life-insurance-compulsory'],
    sources:['nca106','regs','ncr2024'],
    cta:'review',
  },

  {
    slug:'does-credit-life-cover-retrenchment',
    question:'Does credit life cover retrenchment?',
    label:'Does it cover retrenchment?',
    category:'covered',
    description:'Many credit life policies include unemployment cover, but it pays repayments for a limited time and has exclusions. See how the benefit works.',
    short:'Often, but not always, and only for a limited time. For credit life that your provider requires, the regulations set a minimum unemployment benefit. It pays the repayments that fall due while you are out of work, for up to 12 months at the legal minimum, rather than settling the whole debt. Some situations are excluded, and a waiting period can apply.',
    sections:[
      {h:'What the benefit pays',body:[
        {p:'Credit life does not clear your debt if you lose your job. Instead, the benefit pays the repayments that fall due while you are unemployed or unable to earn an income, for whichever of these is shortest:'},
        {ul:[
          '12 months at the legal minimum (some insurers offer longer, so check your policy).',
          'The rest of the repayment period of your credit agreement.',
          'Until you find work or can earn an income again.',
        ]},
        {p:'When the benefit ends, your repayments start again. The debt itself is still there.'},
      ]},
      {h:'When it will not pay',body:[
        {p:'The Credit Life Insurance Regulations list the situations in which required cover may exclude the unemployment benefit:'},
        {ul:[
          'Retrenchment or termination of your employment in the first 3 months after the cover starts (for agreements longer than 6 months).',
          'Retrenchment that you knew about, or were notified of, in the 3 months before the cover started.',
          'Lawful dismissal, including dismissal for misconduct.',
          'Voluntarily giving up your salary or wages.',
          'Voluntary retrenchment or voluntary termination of your employment. Check how your policy treats a voluntary severance package.',
          'Resignation or retirement.',
          'Taking part in an unprotected strike.',
        ]},
        {p:'Check how your policy treats the end of a fixed-term contract, as policies differ.'},
      ]},
      {h:'Who is covered',body:[
        {ul:[
          '**Employed when the cover started:** you can be covered and charged for unemployment cover.',
          '**Not employed when the cover started:** you cannot be charged for the risk of becoming unemployed, so you should not expect to be covered for it.',
          '**Self-employed or working in the informal sector:** the policy may cover an inability to earn an income, other than through retrenchment or occupational disability.',
        ]},
      ]},
      {h:'If you are retrenched',body:[
        {ol:[
          'Read your policy for the deadline to report a claim, and report it early.',
          'Keep your retrenchment notice and any letters from your employer.',
          'Ask whether premiums and repayments must continue while the claim is assessed.',
          'Tell the insurer as soon as you find work or start earning again, because the benefit then ends.',
          'Contact your credit provider early if you may miss a repayment.',
        ]},
      ]},
    ],
    related:['does-credit-life-insurance-cover-disability','credit-life-insurance-exclusions-explained','credit-life-insurance-during-debt-review','how-to-claim-credit-life-insurance'],
    sources:['regs'],
    cta:'quote',
  },

  {
    slug:'does-credit-life-insurance-cover-disability',
    question:'Does credit life insurance cover disability?',
    label:'Does it cover disability?',
    category:'covered',
    description:'Credit life usually covers permanent and temporary disability. See what each benefit pays, the waiting periods and the exclusions that apply.',
    short:'Usually yes. Credit life that your provider requires must include permanent and temporary disability benefits. Permanent disability settles the outstanding balance. Temporary disability pays the repayments that fall due while you cannot work, for up to 12 months at the legal minimum. Waiting periods, assessment periods and exclusions apply.',
    sections:[
      {h:'What the benefits pay',body:[
        {table:{head:['If you become','The minimum benefit under the regulations'],rows:[
          ['Permanently disabled','Settlement of the outstanding balance of your obligations under the credit agreement'],
          ['Temporarily disabled','The obligations that fall due for up to 12 months, the rest of the agreement, or until you are no longer disabled, whichever is shortest'],
        ]}},
        {p:'The regulations define disability broadly. It includes a physical or mental impairment, whole or partial, temporary or permanent, that affects your ability to earn an income or meet your obligations under the credit agreement. It includes occupational disability, which means being unable to continue in your own job, occupation, profession or trade. Your policy sets the test that applies to your claim.'},
      ]},
      {h:'Waiting and assessment periods',body:[
        {ul:[
          'A waiting period of up to 3 months can apply to disability benefits, but only where the credit agreement runs for more than 6 months.',
          'No waiting period can apply to a short-term credit transaction with a term of one month or less.',
          'Insurers usually assess whether a disability is permanent before paying. The period and the medical evidence needed are set out in your policy.',
        ]},
      ]},
      {h:'What is not covered',body:[
        {p:'Regulation 4 lists the only circumstances in which required credit life may exclude or limit death and disability cover:'},
        {ul:[
          'Abuse of alcohol, drugs or narcotics.',
          'Wilful self-inflicted injury or suicide.',
          'Active participation in war, civil unrest or similar events.',
          'The use of nuclear, biological or chemical weapons, or radioactive contamination.',
          'Taking part in criminal activities.',
          'Hazardous activities such as mountain climbing, bungee jumping and speed racing.',
          'A pre-existing condition you knew about that affected you in the 12 months before the cover began.',
        ]},
        {p:'If you disclose a specific pre-existing condition before the cover starts, it may only be excluded if you are clearly told about that exclusion.'},
      ]},
      {h:'Pensioners and the self-employed',body:[
        {p:'If you were already a pensioner when the cover started, you cannot be charged for occupational disability cover. If you are self-employed or work in the informal sector, the policy may include cover for being unable to earn an income, other than through retrenchment or occupational disability.'},
      ]},
      {h:'Optional extras',body:[
        {p:'Some policies add a larger temporary disability benefit that settles your total obligations instead of only your repayments. It can raise the premium by up to R1 per R1 000, and a credit provider cannot force you to take it. See [how much does credit life insurance cost?](/resources/how-much-does-credit-life-insurance-cost)'},
      ]},
      {h:'If you become disabled',body:[
        {ol:[
          'Report the claim as early as you can. Policies set deadlines.',
          'Ask your doctor for the medical evidence your insurer asks for.',
          'Ask whether repayments and premiums must continue while the claim is assessed.',
          'Tell the insurer when your condition changes.',
        ]},
      ]},
    ],
    related:['does-credit-life-cover-retrenchment','credit-life-insurance-exclusions-explained','how-to-claim-credit-life-insurance','what-happens-to-my-loan-if-i-die'],
    sources:['regs'],
    cta:'quote',
  },

  {
    slug:'what-happens-to-my-loan-if-i-die',
    question:'What happens to my loan if I die?',
    label:'What happens to my loan if I die?',
    category:'death',
    description:'If you die with a loan, credit life cover may settle the balance. Without it, the debt becomes a claim against your estate. Here is how it works.',
    short:'If you have credit life insurance and the claim is valid, the insurer pays the outstanding balance to your credit provider and the debt is settled, so it does not fall on your estate. Without cover, the debt is a claim against your estate, and your executor must deal with it before your heirs receive their inheritance.',
    sections:[
      {h:'With credit life insurance',body:[
        {p:'For credit life that a credit provider requires, the regulations set death cover at the settlement of the outstanding balance of your obligations under the credit agreement. The insurer pays the credit provider directly.'},
        {p:'A claim is paid only if the conditions in the policy are met. Typically that means:'},
        {ul:[
          'The policy was in force and premiums were up to date.',
          'The death is not excluded, for example by a pre-existing condition you knew about in the 12 months before cover began, or by suicide.',
          'The claim was reported within the time the policy allows.',
        ]},
        {p:'Ask whether the insured amount covers the whole balance, including any arrears, interest and fees. For optional cover, the policy sets the benefit.'},
      ]},
      {h:'Without credit life insurance',body:[
        {p:'Your debts do not disappear. They are claims against your estate, and your executor must deal with them before heirs receive what is left.'},
        {ul:[
          '**Secured debt**, such as a bond or vehicle finance, is tied to the asset. The lender may require the asset to be sold to settle the debt.',
          '**Unsecured debt**, such as a personal loan or credit card, is paid from the remaining assets in the estate.',
          '**If the estate cannot cover the debts,** creditors may be paid only part of what they are owed, and heirs may inherit little or nothing. The shortfall is generally not passed on to your family.',
        ]},
      ]},
      {h:'Who else may be liable',body:[
        {ul:[
          'A **co-borrower** or joint account holder.',
          'A **surety**, which is someone who signed to guarantee the debt.',
          'A **spouse married in community of property**, where the joint estate may be affected. Speak to an attorney about your circumstances.',
        ]},
        {p:'Family members who did not sign for the debt are generally not personally liable for it. If a creditor contacts them, they can refer the creditor to the executor.'},
      ]},
      {h:'What your family should do',body:[
        {ol:[
          'Find your credit agreements and any credit life policy documents. The insurer’s details are on the policy schedule.',
          'Tell the credit provider and the insurer about the death promptly, because claims have time limits.',
          'Have the death certificate and the claim forms ready.',
          'Ask the executor, who is appointed through the Master of the High Court, how the debts will be handled.',
          'Do not agree to pay the debt personally before getting advice.',
        ]},
        {note:'This is general information, not legal advice. Estates differ, so speak to an attorney or the executor about your situation.'},
      ]},
      {h:'Credit life is not ordinary life cover',body:[
        {p:'Credit life pays your credit provider, not your family. Ordinary life cover pays the beneficiaries you choose. See [what is credit life insurance?](/resources/what-is-credit-life-insurance)'},
      ]},
    ],
    related:['what-happens-to-car-finance-if-i-die','what-happens-to-my-bond-if-i-die','how-to-claim-credit-life-insurance','who-gets-paid-when-credit-life-insurance-pays-out'],
    sources:['regs'],
    cta:'quote',
  },

  {
    slug:'what-happens-to-car-finance-if-i-die',
    question:'What happens to car finance if I die?',
    label:'What happens to car finance if I die?',
    category:'death',
    description:'If you die with vehicle finance, credit life cover may settle it. Without cover, the debt falls to your estate and the car may be sold.',
    short:'If your vehicle finance is covered by credit life and the claim is valid, the insurer pays the outstanding balance to the finance provider and the car is paid off. If it is not covered, the finance remains a debt of your estate. In most instalment sale agreements the finance provider stays the owner until the car is paid for, so it can require the debt to be settled or the vehicle to be returned and sold.',
    sections:[
      {h:'If you have credit life',body:[
        {p:'The insurer pays the outstanding balance to the finance provider, subject to the policy terms, and the finance agreement is settled. Before you rely on this, check:'},
        {ul:[
          'Whether any balloon or residual payment is part of the insured amount.',
          'Whether arrears, interest and fees are included.',
          'Whether the cover is in your name only or also covers a co-borrower.',
        ]},
        {p:'Credit life is often added at the dealership when the finance is signed, so look for it in your finance agreement.'},
      ]},
      {h:'If you do not have credit life',body:[
        {p:'The finance agreement is a debt of your estate. The executor and the finance provider usually look at these options:'},
        {ul:[
          '**Settle the balance** from the estate’s funds.',
          '**Transfer the agreement to an heir.** This needs the finance provider’s agreement, and it will usually assess whether the heir can afford the repayments.',
          '**Sell the car and settle the balance.** If the sale does not cover everything owed, the shortfall remains a claim against the estate.',
        ]},
        {p:'If repayments stop, the finance provider must follow the legal process in the National Credit Act before it repossesses the car. Family members who did not sign for the finance are generally not personally liable for it.'},
      ]},
      {h:'Keep the covers apart',body:[
        {table:{head:['Cover','What it is for'],rows:[
          ['Credit life insurance','Settles the finance, or covers repayments, if an insured event happens to you'],
          ['Motor insurance','Loss of or damage to the car, and liability to others'],
          ['Shortfall insurance','A gap between a motor claim payout and the balance owed on the finance'],
        ]}},
        {p:'A credit life claim does not pay for damage to the car, and motor insurance does not settle your finance if you die. See [vehicle finance cover](/vehicle-finance-cover).'},
      ]},
      {h:'What your family should do',body:[
        {ol:[
          'Tell the finance provider and the credit life insurer about the death promptly.',
          'Ask the finance provider for a written settlement figure.',
          'Keep the car insured and stored safely until the finance is settled.',
          'Speak to the executor before selling the car or transferring the agreement.',
        ]},
        {note:'This is general information, not legal advice. Speak to an attorney or the executor about your situation.'},
      ]},
    ],
    related:['what-happens-to-my-loan-if-i-die','what-happens-to-my-bond-if-i-die','credit-life-insurance-for-vehicle-finance'],
    sources:['regs'],
    cta:'quote',
  },

  {
    slug:'what-happens-to-my-bond-if-i-die',
    question:'What happens to my bond if I die?',
    label:'What happens to my bond if I die?',
    category:'death',
    description:'If you die with a home loan, credit life may settle the bond. Without it, the bank holds the property as security and your estate must deal with it.',
    short:'If your home loan is covered by credit life and the claim is valid, the insurer pays the outstanding balance to the bank and the bond is settled. If it is not covered, the bond is a debt of your estate. The bank holds security over the property, so your executor may have to settle the bond, transfer it to an heir with the bank’s agreement, or sell the home.',
    sections:[
      {h:'If your bond has credit life',body:[
        {p:'The insurer pays the outstanding balance to the bank, up to the insured amount, and the bond is settled. Before you rely on this, check:'},
        {ul:[
          'Whether the insured amount covers the whole bond, including any additional amounts you drew down.',
          'Whether the cover is for you alone or for each borrower on a joint bond.',
          'What happens when one of two borrowers dies: whether the insurer settles the whole bond or only that borrower’s share.',
        ]},
      ]},
      {h:'If your bond has no credit life',body:[
        {p:'The bond is a debt of your estate, and the bank holds the property as security. Your executor and the bank usually look at these options:'},
        {ul:[
          '**An heir takes over the bond.** This needs the bank’s agreement, and it will usually assess whether the heir can afford the repayments.',
          '**The estate or an heir pays off the bond,** for example by refinancing.',
          '**The property is sold** and the bond is settled from the proceeds. If the sale does not cover the bond, the shortfall remains a claim against the estate.',
        ]},
        {p:'If repayments stop, the bank can take legal steps to recover the debt, which can include selling the property through the courts. If you were married in community of property, the joint estate is involved, so speak to an attorney.'},
      ]},
      {h:'Credit life is not homeowner’s insurance',body:[
        {p:'Credit life concerns events affecting you as the borrower. Buildings insurance covers damage to the property, and it is usually a condition of the bond. Ordinary life cover pays your chosen beneficiaries. They do different jobs, so review each one. See [home loan cover](/home-loan-cover).'},
      ]},
      {h:'What your family should do',body:[
        {ol:[
          'Tell the bank and any credit life insurer about the death promptly.',
          'Ask the bank for a bond statement and a written settlement figure.',
          'Keep the buildings insurance, rates and levies up to date while the estate is administered.',
          'Ask the executor, who is appointed through the Master of the High Court, how the bond will be handled.',
        ]},
        {note:'This is general information, not legal advice. Speak to an attorney or the executor about your situation.'},
      ]},
    ],
    related:['what-happens-to-my-loan-if-i-die','what-happens-to-car-finance-if-i-die','credit-life-insurance-for-home-loans'],
    sources:['regs'],
    cta:'quote',
  },

  {
    slug:'can-i-replace-my-banks-credit-life-insurance',
    question:'Can I replace my bank’s credit life insurance?',
    label:'Can I replace my bank’s cover?',
    category:'switching',
    description:'You can substitute your bank’s credit life policy with your own. Compare like for like, follow the steps and do not cancel the old cover too early.',
    short:'Yes. If your bank or credit provider required credit life, you may substitute a policy of your own choice, and the provider must accept it if it provides at least the minimum benefits in the Credit Life Insurance Regulations. Do not cancel the bank’s cover until the replacement has been accepted.',
    sections:[
      {h:'Compare like for like',body:[
        {table:{head:['What to compare','What to look for'],rows:[
          ['Premium and basis','The rate per R1 000, and whether it is charged on your original balance or on what you owe from time to time'],
          ['Benefits','Death, permanent disability, temporary disability and unemployment, at least at the Regulation 3 minimum'],
          ['Waiting periods and exclusions','A new policy starts new waiting periods and can exclude conditions you already have'],
          ['Amount insured','It should follow what you owe and not materially exceed it'],
          ['Claims process','The insurer, the evidence it needs and the deadline for reporting a claim'],
        ]}},
      ]},
      {h:'Step by step',body:[
        {ol:[
          'Ask your bank for your policy schedule, the premium basis, the insured amount and your current balance.',
          'Get quotes for the same debt from other insurers or through a broker.',
          'Check each quote against the minimum benefits in Regulation 3.',
          'Apply, then wait until the new insurer has accepted you and confirmed the date cover starts.',
          'Give your bank the new insurer’s details within 5 business days of taking up the new policy, with any documents it asks for.',
          'Cancel the bank’s policy only after the bank confirms in writing that it accepts the replacement.',
          'Keep copies of everything.',
        ]},
      ]},
      {h:'What your bank can and cannot do',body:[
        {ul:[
          '**It can** ask for proof that the new policy provides at least the minimum benefits, and ask for its interest to be recorded on the policy.',
          '**It cannot** refuse a compliant policy just because it is not the bank’s own.',
        ]},
        {p:'If your bank refuses, ask for its reasons in writing and refer it to section 106(4) of the National Credit Act and Regulation 7. If you are not satisfied, use the bank’s complaints process and then contact the National Credit Regulator at ncr.org.za.'},
      ]},
      {h:'When replacing may not be worth it',body:[
        {ul:[
          'The balance is small or the loan is almost paid off.',
          'Your health has changed and the new policy would exclude a condition.',
          'The retrenchment cover would restart its waiting period.',
          'The saving is small compared with the benefits you would lose.',
        ]},
      ]},
    ],
    related:['can-i-change-my-credit-life-insurer','can-i-cancel-credit-life-insurance','how-much-does-credit-life-insurance-cost'],
    sources:['nca106','regs','ncr2024'],
    cta:'review',
  },

  {
    slug:'how-is-credit-life-insurance-calculated',
    question:'How is credit life insurance calculated?',
    label:'How is it calculated?',
    category:'basics',
    description:'Credit life premiums are a monthly rate per R1 000 of the insured amount. See the formula, the legal ceilings, worked examples and what to ask.',
    short:'Your premium is a monthly rate per R1 000 of the insured amount. The regulations cap that rate, at R4.50 per R1 000 for most credit and R2 for most home loans, and the National Credit Regulator expects cover and cost to stay in line with what you still owe.',
    sections:[
      {h:'The basic formula',body:[
        {p:'Monthly premium = (insured amount ÷ R1 000) × the rate per R1 000.'},
        {p:'For example, at a rate of R3 per R1 000, an insured amount of R50 000 gives 50 × R3 = R150 a month. The rate and the insured amount are what change from one provider to the next.'},
      ]},
      {h:'What the insured amount is',body:[
        {p:'Regulation 3(1) lets a provider charge on either of two bases:'},
        {ul:[
          '**The deferred amount at the start of the agreement.** The insured amount is fixed when you sign, so the premium may stay the same as you repay.',
          '**The deferred amount from time to time.** The insured amount follows your balance, so the premium falls as you repay.',
        ]},
        {p:'The deferred amount is broadly the amount of credit you are borrowing, without the cost of the credit life insurance itself. For credit facilities such as credit cards, the premium is based on your average use of the credit limit in the billing cycle.'},
        {p:'In March 2026 the National Credit Regulator issued a guideline on this. Whichever basis is used, cover must not materially exceed what you owe, and the premium must not charge you for materially more cover than the risk the insurer carries. The guideline applies going forward, so practice can still differ. Ask your provider which basis it uses.'},
      ]},
      {h:'The legal ceiling in numbers',body:[
        {table:{head:['Example','Rate ceiling','Maximum per month'],rows:[
          ['R800 000 home loan','R2 per R1 000','800 × R2 = R1 600'],
          ['R50 000 personal loan','R4.50 per R1 000','50 × R4.50 = R225'],
          ['Credit card with average use of R10 000','R4.50 per R1 000','10 × R4.50 = R45'],
        ]}},
        {note:'These are the most the regulations allow, not typical premiums. They are not quotations. The ceiling includes any commission, fees and expenses, and the cost must reflect the actual risk.'},
      ]},
      {h:'What changes the rate',body:[
        {ul:[
          '**The type of credit.** Home loans have a lower ceiling.',
          '**The benefits.** Extra benefits that settle your total obligations when you are temporarily disabled or unable to earn an income can add up to R1 per R1 000. You cannot be charged for unemployment cover if you were not employed when cover began.',
          '**Your age.** The regulations set age bands only for affordable housing home loans.',
          '**How the insurer rates the risk.** This can be based on your own profile or on a group of borrowers.',
        ]},
      ]},
      {h:'If the premium is charged annually',body:[
        {p:'Where the cost is charged once a year, the ceiling is the monthly limit multiplied by 12. If it is charged for a period shorter than 12 months, the ceiling is the monthly limit multiplied by the number of months.'},
      ]},
      {h:'Questions to ask your provider',body:[
        {ol:[
          'What is the rate per R1 000?',
          'What amount is the premium calculated on?',
          'Will the premium fall as I repay?',
          'Which benefits are included, and what are the waiting periods and exclusions?',
        ]},
      ]},
    ],
    related:['how-much-does-credit-life-insurance-cost','credit-life-insurance-for-credit-cards','is-credit-life-insurance-compulsory','what-is-credit-life-insurance'],
    sources:['regs','ncr2026'],
    cta:'quote',
  },

  {
    slug:'credit-life-insurance-for-personal-loans',
    question:'Credit life insurance for personal loans',
    label:'Personal loans',
    category:'type',
    description:'How credit life insurance works for a personal loan in South Africa: what it covers, the R4.50 per R1 000 ceiling and what to check before you sign.',
    short:'Credit life on a personal loan is cover linked to that one loan. If you die or become permanently disabled, a valid claim settles the outstanding balance. If you become temporarily disabled or lose your income, it may pay your repayments for a limited time. For required cover, the monthly ceiling is R4.50 per R1 000.',
    sections:[
      {h:'How it works on a personal loan',body:[
        {p:'A personal loan is usually unsecured, which means the lender has no asset to take if you cannot repay. Many lenders therefore require credit life insurance as protection for the loan. The premium is usually collected with your monthly repayment, so it may not show up as a separate payment.'},
        {p:'The cover is tied to the loan. As you repay, the balance you owe goes down, and the amount insured should go down with it. See [what is credit life insurance?](/resources/what-is-credit-life-insurance) for the basics.'},
      ]},
      {h:'What it can pay',body:[
        {table:{head:['If this happens','What the cover can pay'],rows:[
          ['You die','The outstanding balance of the loan'],
          ['You become permanently disabled','The outstanding balance of the loan'],
          ['You become temporarily disabled','Your repayments while you cannot work, for up to 12 months at the legal minimum'],
          ['You lose your job or income','Your repayments for up to 12 months at the legal minimum, in certain circumstances'],
        ]}},
        {p:'These are the minimum benefits for required cover. Some insurers offer more, and every policy has exclusions. See [credit life insurance exclusions explained](/resources/credit-life-insurance-exclusions-explained).'},
      ]},
      {h:'What it costs',body:[
        {p:'For required cover on unsecured credit, the Credit Life Insurance Regulations set a ceiling of R4.50 per R1 000 of the deferred amount each month. The ceiling includes commission, fees and expenses. On a R30 000 loan, the ceiling works out at 30 × R4.50 = R135 a month.'},
        {note:'That figure is the most the regulations allow. It is not a typical price and not a quotation. See [how much does credit life insurance cost?](/resources/how-much-does-credit-life-insurance-cost) and [how is credit life insurance calculated?](/resources/how-is-credit-life-insurance-calculated)'},
      ]},
      {h:'Short loans and waiting periods',body:[
        {p:'A waiting period of up to 3 months can apply to disability benefits only where the loan runs for more than 6 months, and no waiting period can apply to a loan of one month or less. A retrenchment in the first 3 months after cover starts can be excluded on loans longer than 6 months.'},
      ]},
      {h:'Before you sign',body:[
        {ul:[
          'Ask whether the cover is required or optional.',
          'Ask for the premium, the rate per R1 000 and the amount it is charged on.',
          'Check the waiting periods and exclusions, and ask for them in writing.',
          'If cover is required, remember that you can use a policy of your own choice. See [can I change my credit life insurer?](/resources/can-i-change-my-credit-life-insurer)',
          'If you take a new loan to settle an old one, ask whether your cover carries over or whether new waiting periods and exclusions start.',
        ]},
      ]},
      {h:'Take the next step',body:[
        {p:'To explore options for an eligible personal loan, see [personal loan cover](/personal-loan-cover) or [request a quote](/quote).'},
      ]},
    ],
    related:['how-much-does-credit-life-insurance-cost','is-credit-life-insurance-compulsory','does-credit-life-cover-retrenchment','credit-life-insurance-exclusions-explained'],
    sources:['regs','nca106'],
    cta:'quote',
  },

  {
    slug:'credit-life-insurance-for-vehicle-finance',
    question:'Credit life insurance for vehicle finance',
    label:'Vehicle finance',
    category:'type',
    description:'How credit life insurance works for vehicle finance in South Africa, how it differs from motor and shortfall cover and what to ask at the dealership.',
    short:'Credit life on vehicle finance protects the debt, not the car. If you die or become permanently disabled, a valid claim settles the outstanding balance on the finance. It does not pay for damage to the car, which is the job of motor insurance. For required cover, the monthly ceiling is R4.50 per R1 000.',
    sections:[
      {h:'What credit life does on vehicle finance',body:[
        {p:'Credit life is linked to the finance agreement. It responds to events that affect you as the borrower: death, disability and, in certain circumstances, losing your income. At the legal minimum, death and permanent disability settle the outstanding balance, while temporary disability and unemployment pay your repayments for up to 12 months. See [does credit life insurance cover disability?](/resources/does-credit-life-insurance-cover-disability) and [does credit life cover retrenchment?](/resources/does-credit-life-cover-retrenchment)'},
      ]},
      {h:'Three covers, three jobs',body:[
        {table:{head:['Cover','What it is for'],rows:[
          ['Credit life insurance','Settles the finance, or covers repayments, if an insured event happens to you'],
          ['Motor insurance','Loss of or damage to the car, and liability to others'],
          ['Shortfall insurance','A gap between a motor claim payout and the balance owed on the finance'],
        ]}},
        {p:'Do not assume one replaces another. See [vehicle finance cover](/vehicle-finance-cover) for how they differ.'},
      ]},
      {h:'What it costs',body:[
        {p:'Vehicle finance falls under “other credit agreements” in the regulations. For required cover, the ceiling is R4.50 per R1 000 of the deferred amount each month, including any commission, fees and expenses. That is a maximum, not a quotation. See [how much does credit life insurance cost?](/resources/how-much-does-credit-life-insurance-cost)'},
      ]},
      {h:'Questions to ask at the dealership',body:[
        {ul:[
          'Is credit life required for this finance, or optional?',
          'What is the premium, and is it included in the monthly instalment?',
          'If it is required, can I use a policy of my own choice? You have that right under section 106(4) of the National Credit Act.',
          'Which events does it cover, and what are the waiting periods and exclusions?',
          'Who is the insurer, and who do I contact to claim?',
        ]},
      ]},
      {h:'Balloon payments, deposits and the insured amount',body:[
        {p:'Ask how your deposit and any balloon or residual payment affect the amount the premium is based on, and whether the balloon is part of the amount insured. If it is not, a claim may leave a balance unpaid.'},
      ]},
      {h:'If you settle early or trade in',body:[
        {ul:[
          'Ask for a settlement figure and written confirmation that the premium stops once the finance is settled.',
          'Ask whether any refund is due.',
          'New finance on a replacement car is a new credit agreement, so new cover, waiting periods and exclusions can apply.',
        ]},
      ]},
    ],
    related:['what-happens-to-car-finance-if-i-die','how-is-credit-life-insurance-calculated','can-i-change-my-credit-life-insurer','credit-life-insurance-exclusions-explained'],
    sources:['regs','nca106'],
    cta:'quote',
  },

  {
    slug:'credit-life-insurance-for-home-loans',
    question:'Credit life insurance for home loans',
    label:'Home loans',
    category:'type',
    description:'How credit life insurance works for a home loan in South Africa: the lower R2 per R1 000 ceiling, joint bonds and how it differs from buildings insurance.',
    short:'Credit life on a home loan protects the bond, not the building. If you die or become permanently disabled, a valid claim settles the outstanding balance of the bond. For required cover, the monthly ceiling is lower than for other credit: R2 per R1 000 for most home loans, and R2.50 for borrowers over 55 on affordable housing loans.',
    sections:[
      {h:'What it does for a bond',body:[
        {p:'Credit life is linked to your home loan. If you die or become permanently disabled, a valid claim settles the outstanding balance of the bond, and the property is no longer tied to that debt. If you become temporarily disabled or lose your income, it can pay your repayments for a limited time, up to 12 months at the legal minimum.'},
        {p:'A home loan usually runs for 20 years or more, so the way the premium is calculated matters. See [how is credit life insurance calculated?](/resources/how-is-credit-life-insurance-calculated)'},
      ]},
      {h:'The lower ceiling for home loans',body:[
        {table:{head:['Type of home loan','Maximum per month'],rows:[
          ['Home loans, other than affordable housing','R2 per R1 000 of the deferred amount'],
          ['Affordable housing home loans','R2 per R1 000 if you are under 55, R2.50 if you are over 55'],
        ]}},
        {p:'On an R800 000 bond, the R2 ceiling works out at 800 × R2 = R1 600 a month. That is the most the regulations allow for required cover, not a typical premium and not a quotation.'},
      ]},
      {h:'Joint bonds',body:[
        {p:'The regulated ceiling applies to each person insured. If two of you share a bond, ask:'},
        {ul:[
          'Is each borrower covered, or only one?',
          'When one borrower dies, does the insurer settle the whole bond or only that borrower’s share?',
          'What happens to the cover on the surviving borrower’s side?',
        ]},
      ]},
      {h:'Not the same as buildings insurance',body:[
        {p:'Credit life concerns events affecting you as the borrower. Buildings insurance covers damage to the property, and it is usually a condition of the bond. Ordinary life cover pays your chosen beneficiaries. See [credit life insurance vs life insurance](/resources/credit-life-insurance-vs-life-insurance).'},
      ]},
      {h:'Before you sign or top up',body:[
        {ul:[
          'Ask whether the cover is required or optional.',
          'Ask whether the premium is based on your original bond amount or on what you owe from time to time.',
          'If you increase the bond later, ask whether your cover increases too and whether new waiting periods apply.',
          'If cover is required, remember that you can use a policy of your own choice. See [can I replace my bank’s credit life insurance?](/resources/can-i-replace-my-banks-credit-life-insurance)',
        ]},
        {p:'To explore options for an eligible home loan, see [home loan cover](/home-loan-cover) or [request a quote](/quote).'},
      ]},
    ],
    related:['what-happens-to-my-bond-if-i-die','how-is-credit-life-insurance-calculated','can-i-replace-my-banks-credit-life-insurance','credit-life-insurance-vs-life-insurance'],
    sources:['regs','nca106','ncr2026'],
    cta:'quote',
  },

  {
    slug:'credit-life-insurance-for-credit-cards',
    question:'Credit life insurance for credit cards',
    label:'Credit cards',
    category:'type',
    description:'How credit life insurance works on a credit card or store account in South Africa: premiums based on your average use, what it covers and what to check.',
    short:'On a credit card or store account, credit life covers the balance you owe, which changes every month. For required cover, the regulated ceiling is R4.50 per R1 000 of your average use of the credit limit in the billing cycle, not of the limit itself.',
    sections:[
      {h:'Why cards are different',body:[
        {p:'A card or store account is revolving credit. The balance goes up when you spend and down when you pay, and there is no fixed term or fixed instalment. Because section 106(1) of the National Credit Act says required cover may not exceed what you owe at any time, the insured amount on a card has to follow a balance that keeps moving.'},
      ]},
      {h:'How the premium is set',body:[
        {p:'For credit facilities such as credit cards and store accounts, the Credit Life Insurance Regulations set the monthly ceiling for required cover at R4.50 per R1 000 of your average use of the credit limit in the billing cycle. The ceiling includes commission, fees and expenses.'},
        {table:{head:['Average use in the billing cycle','Maximum per month'],rows:[
          ['R2 000','2 × R4.50 = R9'],
          ['R10 000','10 × R4.50 = R45'],
          ['R25 000','25 × R4.50 = R112.50'],
        ]}},
        {note:'These are ceilings, not typical premiums and not quotations. See [how is credit life insurance calculated?](/resources/how-is-credit-life-insurance-calculated)'},
      ]},
      {h:'What it can pay',body:[
        {ul:[
          '**Death or permanent disability:** the outstanding balance on the card or account.',
          '**Temporary disability or unemployment:** the repayments that fall due, for up to 12 months at the legal minimum. This pays your repayments. It does not clear the balance.',
        ]},
        {p:'Policies define the outstanding amount differently. Check whether it includes interest, fees and arrears, and whether purchases made before the event but processed after it are counted.'},
      ]},
      {h:'Before you accept cover on a card',body:[
        {ul:[
          'Ask whether the cover is required or optional. A card can often be opened or kept without optional cover.',
          'Ask which rate per R1 000 applies and how it is worked out each month.',
          'Check where the premium appears on your statement.',
          'Ask what happens to the cover and the premium if you close the card.',
          'Check the waiting periods and exclusions. See [credit life insurance exclusions explained](/resources/credit-life-insurance-exclusions-explained).',
        ]},
      ]},
    ],
    related:['how-much-does-credit-life-insurance-cost','how-is-credit-life-insurance-calculated','is-credit-life-insurance-compulsory','can-i-cancel-credit-life-insurance'],
    sources:['regs','nca106','ncr2026'],
    cta:'quote',
  },

  {
    slug:'credit-life-insurance-during-debt-review',
    question:'Credit life insurance during debt review',
    label:'During debt review',
    category:'type',
    description:'What happens to credit life insurance when you are under debt review in South Africa: premiums, defaults and what your debt counsellor should check.',
    short:'Debt review does not end your credit life cover, and the premiums still matter. The NCR’s debt review guidelines tell debt counsellors to check that credit-linked insurance premiums are maintained and included in your payment plan. If the premiums stop, the cover can lapse, and you may be in default of your credit agreement even if you are paying the instalment.',
    sections:[
      {h:'Debt review in brief',body:[
        {p:'In debt review, a registered debt counsellor assesses whether you are over-indebted and, if you are, proposes a rearrangement of your repayments. The payments are usually collected as one monthly amount by a payment distribution agency, which pays your credit providers.'},
        {p:'Debt review changes how you repay your debts. It does not change what happens to them if you die, become disabled or lose your income. That is the job of your insurance.'},
      ]},
      {h:'What the NCR’s guidelines say',body:[
        {ul:[
          'The debt counsellor should verify that premiums for credit-linked insurance that formed part of your monthly repayments are maintained and included in the payment plan.',
          'Those premiums, and other insurance required under your credit agreements, should be treated as essential expenses in your budget.',
          'If the premium rises, the plan should be updated at the annual review.',
          'Failing to maintain credit-linked insurance premiums can be a default of the credit agreement in a respect other than payment, so a credit provider may treat it as a default even when your instalment is paid.',
          'Debt counsellors are encouraged to check whether your credit life includes retrenchment cover, because it can help if your income stops.',
        ]},
        {note:'These are NCR guidelines for debt counsellors. Your counsellor’s process may differ, so ask them how your policies are handled.'},
      ]},
      {h:'What you should do',body:[
        {ol:[
          'Tell your debt counsellor about every credit life policy, and give them your credit agreements and policy schedules.',
          'Ask them to confirm that each premium is in your payment plan and is being paid.',
          'Do not stop or cancel cover on your own. If it is required, you need a compliant replacement first. See [can I cancel credit life insurance?](/resources/can-i-cancel-credit-life-insurance)',
          'Ask your counsellor before changing insurers, so the payment plan and your credit provider’s records stay in step.',
          'If you lose your income or become disabled, report a claim promptly. See [how to claim credit life insurance](/resources/how-to-claim-credit-life-insurance).',
        ]},
      ]},
      {h:'Who does what',body:[
        {p:'Your debt counsellor supports you. They are not the credit provider, and they do not pay your premiums. The actual credit provider and the agreed payment arrangement are what count. If you are a debt counsellor, see [our debt counsellor solution](/partners/debt-counsellors).'},
      ]},
    ],
    related:['can-i-cancel-credit-life-insurance','does-credit-life-cover-retrenchment','is-credit-life-insurance-compulsory','how-do-i-know-if-i-already-have-credit-life-insurance'],
    sources:['ncrDebtReview','nca106','regs'],
    cta:'review',
  },

  {
    slug:'how-to-claim-credit-life-insurance',
    question:'How to claim credit life insurance',
    label:'How to claim',
    category:'covered',
    description:'How to claim credit life insurance in South Africa: who to tell, the documents you may need, how long a decision takes and what to do if a claim is rejected.',
    short:'Tell your credit provider or insurer as soon as the event happens, get the claim form, send the documents the insurer asks for and keep your reference. Policies set deadlines, so do not wait. The insurer must give you its decision in writing within 10 days of making it, and if it rejects the claim it must explain why and how to challenge it.',
    sections:[
      {h:'Before you start',body:[
        {p:'Find your credit agreement and your policy schedule. The policy names the insurer and says who to contact to claim. For the general route, see [claims guidance](/claims).'},
        {p:'Do not wait until you have every document. Policies set deadlines for reporting an event, and some give a year or less, so report it first and gather documents afterwards.'},
      ]},
      {h:'Step by step',body:[
        {ol:[
          'Report the event to your credit provider or insurer, as your policy directs.',
          'Ask for the claim form and the list of documents needed.',
          'Gather the documents. The insurer may only ask for what is essential to assess the claim.',
          'Submit them through the channel the insurer names, and keep proof that you did.',
          'Answer any request for more information quickly.',
          'Ask whether premiums and repayments must continue while the claim is assessed. Many policies require premiums to be up to date.',
          'Keep your claim reference and every letter you receive.',
        ]},
      ]},
      {h:'Documents you may be asked for',body:[
        {table:{head:['Event','Documents that are typically requested'],rows:[
          ['Death','A death certificate, an identity document and the completed claim form'],
          ['Permanent or temporary disability','Medical reports and test results, a report from your treating doctor, proof of income and an employer declaration'],
          ['Retrenchment or unemployment','The retrenchment or termination letter from your employer, an identity document and recent payslips. UIF documents may also be requested'],
        ]}},
        {p:'Your insurer’s own list applies. Avoid sending sensitive medical or identity documents except through the channel the insurer names.'},
      ]},
      {h:'What the insurer must do',body:[
        {p:'The Policyholder Protection Rules set standards for how long-term insurers handle claims. Among them:'},
        {ul:[
          'The insurer must record your claim and acknowledge it promptly, and tell you how the process works, the expected timelines and what is still outstanding.',
          'It must accept, repudiate or dispute the claim within a reasonable period.',
          'It must tell you its decision in writing within 10 days of making it.',
          'It may not reject a claim without a reasonable investigation.',
        ]},
      ]},
      {h:'If your claim is rejected or disputed',body:[
        {ul:[
          'The insurer’s letter must explain its reasons in plain language, in enough detail for you to challenge them.',
          'You have at least 90 days to make representations, and that period may not count against the policy’s time limit for legal action.',
          'The insurer must answer your representations in writing within 45 days.',
          'The letter must explain the insurer’s internal escalation steps and your right to complain to an ombud.',
        ]},
        {p:'The National Financial Ombud Scheme (nfosa.co.za) handles complaints about insurers, including credit life claims. Keep every letter and your claim reference.'},
      ]},
    ],
    related:['credit-life-insurance-exclusions-explained','who-gets-paid-when-credit-life-insurance-pays-out','does-credit-life-insurance-cover-disability','does-credit-life-cover-retrenchment'],
    sources:['pprClaims','regs'],
    cta:'claims',
  },

  {
    slug:'credit-life-insurance-exclusions-explained',
    question:'Credit life insurance exclusions explained',
    label:'Exclusions explained',
    category:'covered',
    description:'The exclusions allowed in credit life insurance in South Africa explained in plain language: death, disability and retrenchment, plus waiting periods.',
    short:'Regulation 4 lists the only circumstances in which credit life that your provider requires can exclude or limit cover. For death and disability they include abuse of alcohol or drugs, suicide, war, crime, hazardous activities and pre-existing conditions you knew about. For unemployment they include resignation, dismissal and a retrenchment in the first 3 months.',
    sections:[
      {h:'What an exclusion is',body:[
        {p:'An exclusion is a circumstance in which a policy will not pay, even though an insured event such as death or disability has happened. For credit life that a credit provider requires, Regulation 4 of the Credit Life Insurance Regulations says cover may be excluded or limited only in the circumstances it lists.'},
        {p:'Your provider must explain the exclusions to you when the credit agreement is signed and again at regular intervals afterwards.'},
      ]},
      {h:'Death and disability',body:[
        {table:{head:['Excluded','What to know'],rows:[
          ['Abuse of alcohol, drugs or narcotics','The death or disability resulted from the abuse'],
          ['Wilful self-inflicted injury or suicide','The injury was inflicted on purpose, or the death was suicide'],
          ['War and unrest','Active participation in war, civil commotion, rebellion and similar events'],
          ['Nuclear, biological or chemical weapons','Their use, or radioactive contamination'],
          ['Criminal activities','Taking part in criminal activities'],
          ['Hazardous activities','Activities such as mountain climbing, bungee jumping and speed racing. These are examples, so ask how your policy defines them'],
          ['Pre-existing conditions','A condition you knew about that affected you in the 12 months before cover began'],
        ]}},
        {p:'If you tell the insurer about a specific pre-existing condition before cover starts, it may only be excluded if you are clearly told about that exclusion.'},
      ]},
      {h:'Unemployment and inability to earn an income',body:[
        {ul:[
          'Retrenchment or termination of your employment in the first 3 months after cover starts, on agreements longer than 6 months.',
          'A retrenchment that you knew about, or were notified of, in the 3 months before cover started.',
          'Lawful dismissal, including dismissal for misconduct.',
          'Voluntarily giving up your salary or wages.',
          'Voluntary retrenchment or voluntary termination of your employment.',
          'Resignation or retirement.',
          'Taking part in an unprotected strike.',
        ]},
      ]},
      {h:'Waiting periods',body:[
        {p:'A waiting period of up to 3 months can apply to disability benefits, but only where the credit agreement runs for more than 6 months. No waiting period can apply to a short-term credit transaction with a term of one month or less.'},
      ]},
      {h:'Other limits that are not exclusions',body:[
        {ul:[
          'Premiums usually have to be up to date when the event happens.',
          'Policies set deadlines for reporting a claim.',
          'If you were not employed when cover began, you cannot be charged for unemployment cover, so you should not expect to be covered for it.',
          'Temporary disability and unemployment benefits pay your repayments for a limited period. They do not clear the debt.',
        ]},
      ]},
      {h:'What to do',body:[
        {ul:[
          'Read the exclusions in your own policy and ask your provider to explain them in writing.',
          'Disclose any health condition before cover starts.',
          'If your policy for required cover excludes something that Regulation 4 does not list, ask the provider why.',
        ]},
        {p:'See [does credit life insurance cover disability?](/resources/does-credit-life-insurance-cover-disability) and [does credit life cover retrenchment?](/resources/does-credit-life-cover-retrenchment) for how the benefits themselves work.'},
      ]},
    ],
    related:['does-credit-life-insurance-cover-disability','does-credit-life-cover-retrenchment','how-to-claim-credit-life-insurance'],
    sources:['regs'],
    cta:'quote',
  },

  {
    slug:'how-do-i-know-if-i-already-have-credit-life-insurance',
    question:'How do I know if I already have credit life insurance?',
    label:'Do I already have it?',
    category:'basics',
    description:'Not sure if your loan comes with credit life insurance? Learn where to look, what to ask your credit provider and how to confirm what is covered.',
    short:'Look for an insurance premium in your credit agreement, quotation and monthly statements, then ask your credit provider to confirm in writing. Many people do not realise they have credit life because the premium is part of the monthly instalment.',
    sections:[
      {h:'Why it is easy to miss',body:[
        {p:'Credit life is often arranged when you take the loan, and the premium is usually added to your monthly instalment. You may never see it as a separate payment. It can also be described as credit insurance rather than credit life insurance.'},
      ]},
      {h:'Where to look',body:[
        {ol:[
          '**Your credit agreement and quotation.** Before you signed, your credit provider should have given you a pre-agreement statement and quotation setting out the costs of the credit. Look for an insurance premium.',
          '**Your monthly statements.** Look for a line for insurance or a premium.',
          '**Your lender’s app or online profile.** Many have a section for insurance or policies.',
          '**Your policy schedule or certificate.** The insurer or lender may have sent it to you or emailed it.',
          '**Your finance documents.** For vehicle and home loans, check the papers you were given at the dealership, branch or bond signing.',
        ]},
      ]},
      {h:'What to ask your credit provider',body:[
        {ul:[
          'Do I have credit life insurance on this account?',
          'Is it required by my credit agreement, or optional?',
          'Who is the insurer?',
          'What is the premium, and how is it worked out?',
          'Which events does it cover, and what are the waiting periods and exclusions?',
          'Can you send me my policy schedule and the full policy wording in writing?',
        ]},
        {p:'Section 106 of the National Credit Act requires a credit provider that proposes a policy to tell you about your right to use one of your own choice, and to be open about what the insurance costs.'},
      ]},
      {h:'If you find you have cover',body:[
        {ul:[
          'Check what it pays. See [what is credit life insurance?](/resources/what-is-credit-life-insurance)',
          'Check what it costs. See [how much does credit life insurance cost?](/resources/how-much-does-credit-life-insurance-cost)',
          'If you do not want it, find out whether it is required. See [is credit life insurance compulsory?](/resources/is-credit-life-insurance-compulsory)',
          'If you want to compare, see [can I replace my bank’s credit life insurance?](/resources/can-i-replace-my-banks-credit-life-insurance)',
        ]},
      ]},
      {h:'If you find you do not',body:[
        {p:'Without credit life, the debt stays with you, your co-borrowers and your estate if something happens to you. Ordinary life cover does not automatically pay your debts. See [credit life insurance vs life insurance](/resources/credit-life-insurance-vs-life-insurance).'},
      ]},
      {h:'Keep a record',body:[
        {p:'Make a note of each debt, its credit provider, the insurer and the policy reference, and tell someone you trust where it is kept. Your family will need it to claim quickly.'},
      ]},
    ],
    related:['is-credit-life-insurance-compulsory','what-is-credit-life-insurance','can-i-cancel-credit-life-insurance','can-i-replace-my-banks-credit-life-insurance'],
    sources:['nca92','nca106'],
    cta:'review',
  },

  {
    slug:'credit-life-insurance-vs-life-insurance',
    question:'Credit life insurance vs life insurance',
    label:'Credit life vs life insurance',
    category:'basics',
    description:'Credit life insurance vs life insurance in South Africa: who is paid, what is covered, how premiums work and why one does not replace the other.',
    short:'Credit life pays your credit provider to deal with one debt. Ordinary life insurance pays the people you choose, for whatever they need. They do different jobs, and one does not replace the other.',
    sections:[
      {h:'Side by side',body:[
        {table:{head:['Feature','Credit life insurance','Ordinary life insurance'],rows:[
          ['Who is paid','Your credit provider','The beneficiaries you choose'],
          ['What it is linked to','One credit agreement','You and your needs'],
          ['What it pays','The balance on that debt, or its repayments for a limited time','A lump sum or income, as the policy provides'],
          ['How the amount changes','Generally follows the balance you owe','Stays as set unless you change it'],
          ['Events covered','Death and disability, plus unemployment in certain circumstances','Depends on the product. Death is always the core'],
          ['Health questions','Usually few, because it is often priced for a group of borrowers, but pre-existing conditions can be excluded','Often assessed individually, so health questions are common'],
          ['When the debt is settled','The cover normally ends','The cover carries on'],
        ]}},
      ]},
      {h:'When credit life makes sense',body:[
        {ul:[
          'Your credit provider requires it.',
          'You want your debt dealt with without leaving it to your family.',
          'You want help with repayments if you are disabled or lose your income.',
        ]},
      ]},
      {h:'When ordinary life cover helps',body:[
        {p:'Ordinary life cover supports your family beyond the debts: day-to-day living costs, education, funeral costs and the costs of winding up an estate. It can also give your family money to settle debts if you have no credit life, but then those debts use up the payout your family could otherwise have kept.'},
      ]},
      {h:'Can one replace the other?',body:[
        {p:'If your credit agreement requires credit life, a policy you offer as a substitute must provide at least the minimum benefits in Regulation 3, which include disability and unemployment benefits. A policy that pays only on death would not meet that. See [can I change my credit life insurer?](/resources/can-i-change-my-credit-life-insurer)'},
      ]},
      {h:'Check both',body:[
        {ul:[
          'List your debts and find out which have credit life.',
          'Check what your ordinary life cover pays, and who the beneficiaries are.',
          'Decide whether your family could manage the remaining debts if something happened to you.',
        ]},
        {p:'See [how do I know if I already have credit life insurance?](/resources/how-do-i-know-if-i-already-have-credit-life-insurance)'},
      ]},
    ],
    related:['what-is-credit-life-insurance','what-happens-to-my-loan-if-i-die','can-i-replace-my-banks-credit-life-insurance','who-gets-paid-when-credit-life-insurance-pays-out'],
    sources:['regs','nca106'],
    cta:'quote',
  },

  {
    slug:'who-gets-paid-when-credit-life-insurance-pays-out',
    question:'Who gets paid when credit life insurance pays out?',
    label:'Who gets paid?',
    category:'covered',
    description:'When credit life insurance pays out in South Africa, the money goes to your credit provider, not your family. See how payouts work and what happens next.',
    short:'Your credit provider. Credit life pays the lender, which is recorded on the policy as the party to be paid, to settle your debt or cover your repayments. The money does not go to you or your family. Your family benefits because the debt is dealt with.',
    sections:[
      {h:'The credit provider is paid',body:[
        {p:'The Policyholder Protection Rules require an insurer to confirm to a credit provider that a substituted credit life policy is in force and that the credit provider is recorded as the beneficiary, cessionary or loss payee. Section 106 of the National Credit Act limits the cover to what you owe the credit provider, so the credit provider’s interest is limited to your debt.'},
      ]},
      {h:'What is paid, and when',body:[
        {table:{head:['Event','What the insurer pays'],rows:[
          ['Death or permanent disability','The outstanding balance, to the credit provider, which settles the debt'],
          ['Temporary disability','Your repayments, to the credit provider, for as long as the benefit lasts'],
          ['Unemployment or inability to earn an income','Your repayments, to the credit provider, for as long as the benefit lasts'],
        ]}},
        {p:'In each case the money goes to the credit provider and not into your bank account. When a repayment benefit ends, your repayments start again, because the debt has not been settled.'},
      ]},
      {h:'What if the payout is more than the debt?',body:[
        {p:'Required cover is not meant to exceed what you owe. If an amount is ever paid that is more than the debt, the policy wording explains who receives the difference. Ask your insurer if you are unsure.'},
      ]},
      {h:'After a payout settles the debt',body:[
        {ul:[
          'Ask the credit provider for a written statement showing that the account is settled.',
          'For a vehicle or a bond, ask for the documents needed to release the credit provider’s hold on the car or the property.',
          'Check that no further premiums or repayments are taken.',
        ]},
      ]},
      {h:'What goes to your family',body:[
        {p:'Credit life does not pay your family. Ordinary life cover pays the beneficiaries you choose. If you share the debt with someone else, check whether a payout settles the whole debt or only your share. See [credit life insurance vs life insurance](/resources/credit-life-insurance-vs-life-insurance).'},
      ]},
      {h:'If you disagree with the amount',body:[
        {p:'Ask the insurer for a written breakdown, and see [how to claim credit life insurance](/resources/how-to-claim-credit-life-insurance) for how to challenge a decision.'},
      ]},
    ],
    related:['how-to-claim-credit-life-insurance','credit-life-insurance-vs-life-insurance','what-happens-to-my-loan-if-i-die'],
    sources:['pprCreditLife','nca106','regs'],
    cta:'claims',
  },
];

// South African style puts a space in thousands (R1 000). Make it a non-breaking space so a figure never wraps across two lines.
const nb=<T>(v:T):T=>{
  if(typeof v==='string')return v.replace(/(\d) (?=\d{3}\b)/g,'$1 ') as T;
  if(Array.isArray(v))return v.map(nb) as T;
  if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,nb(x)])) as T;
  return v;
};

export const resources:Resource[]=nb(raw);
export const getResource=(slug:string)=>resources.find(r=>r.slug===slug);
