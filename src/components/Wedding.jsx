import { wedding as w } from '../data/content'
import { Label, P, Poster, Rule, T, Txt } from './poster'

const Lines = ({ list }) => list.map((l) => <p key={l}>{l}</p>)

// Page 1: the wedding invitation itself
export function WeddingInvite() {
  return (
    <Poster auto petalCount={7} label="Wedding invitation">
      <div className="rv om" style={{ ...P(427, 76), ...T(0.5) }} lang="sa">
        ॐ
      </div>
      <Txt x={427} y={137} w={300} cls="serif s-invoc-en" d={0.8} as="p">
        {w.invocation}
      </Txt>

      <Txt x={430} y={190} w={400} cls="caps s-rel" d={1.1}>
        <Label>{w.blessingsIntro}</Label>
      </Txt>
      <Txt x={430} y={216} w={420} cls="caps s-late" d={1.3}>
        <Lines list={w.blessings[0]} />
        <p className="gap" />
        <Lines list={w.blessings[1]} />
      </Txt>

      <Txt x={430} y={352} w={440} cls="serif s-invited" d={1.7}>
        {w.invited}
      </Txt>
      <Txt x={430} y={392} w={440} cls="name name-lg" d={1.9} as="h2">
        {w.groom.name}
      </Txt>
      <Txt x={430} y={442} w={380} cls="caps s-parent" d={2.1}>
        <p>
          <span className="rel">{w.groom.rel}</span> {w.groom.parents[0]}
        </p>
        <p>{w.groom.parents[1]}</p>
      </Txt>

      <Txt x={430} y={540} w={300} cls="weds" d={2.5}>
        {w.weds}
      </Txt>

      <Txt x={430} y={600} w={440} cls="name name-lg" d={2.9} as="h2">
        {w.bride.name}
      </Txt>
      <Txt x={430} y={650} w={380} cls="caps s-parent" d={3.1}>
        <p>
          <span className="rel">{w.bride.rel}</span> {w.bride.parents[0]}
        </p>
        <p>{w.bride.parents[1]}</p>
      </Txt>

      <Rule y={745} d={3.4} />
      <Txt x={224} y={780} w={230} cls="member" d={3.6}>
        <p className="side">Bride's family</p>
        {w.brideFamily.map(([r, n]) => (
          <div key={r} className="mb">
            <p className="role">{r}</p>
            <p className="who">{n}</p>
          </div>
        ))}
      </Txt>
      <Txt x={632} y={780} w={230} cls="member" d={3.8}>
        <p className="side">Groom's family</p>
        {w.groomFamily.map(([r, n]) => (
          <div key={r} className="mb">
            <p className="role">{r}</p>
            <p className="who">{n}</p>
          </div>
        ))}
      </Txt>
    </Poster>
  )
}

function Event({ y, e }) {
  const tba = (v) => v || w.tba
  return (
    <>
      <Txt x={430} y={y} w={520} cls="title-sm" d={1} as="h2">
        <span className="title-text">{e.name || w.tba}</span>
      </Txt>
      <Txt x={430} y={y + 78} w={400} cls="date-sm" d={1.3}>
        {e.date ? (
          <>
            <p>{e.date}</p>
            {e.weekday && <p className="wd">{e.weekday}</p>}
          </>
        ) : (
          <p className="tba">{w.tba}</p>
        )}
      </Txt>
      <Txt x={429} y={y + 150} w={254} cls={`pill ${e.time ? '' : 'pill-tba'}`} d={1.5}>
        <span>{e.time || w.tba}</span>
      </Txt>
      <Txt x={430} y={y + 212} w={300} cls="caps s-venue" d={1.7}>
        <Label>VENUE</Label>
      </Txt>
      <Txt x={430} y={y + 238} w={440} cls="venue-sm" d={1.8}>
        {tba(e.venue)}
      </Txt>
    </>
  )
}

// Pages for the functions: one or two per page
export function FunctionPage({ page }) {
  const two = page.events.length > 1
  return (
    <Poster auto petalCount={6} label={page.events.map((e) => e.name).join(' and ')}>
      <div className="rv om" style={{ ...P(427, 76), ...T(0.4) }} lang="sa">
        ॐ
      </div>
      <Txt x={430} y={137} w={420} cls="caps s-rel" d={0.7}>
        <Label>{w.hashtag}</Label>
      </Txt>
      <Txt x={430} y={205} w={560} cls="serif page-intro" d={0.9}>
        <p>{page.intro || 'An intimate celebration filled with family, tradition and joyful memories.'}</p>
      </Txt>
      {two ? (
        <>
          <Event y={452} e={page.events[0]} />
          <Rule y={752} d={1.6} />
          <Event y={782} e={page.events[1]} />
        </>
      ) : (
        <Event y={560} e={page.events[0]} />
      )}
    </Poster>
  )
}

export function Closing() {
  const { closing: cl } = w
  return (
    <Poster auto petalCount={9} label="RSVP and contact">
      <div className="rv om" style={{ ...P(427, 76), ...T(0.4) }} lang="sa">
        ॐ
      </div>
      <Txt x={430} y={470} w={540} cls="title-sm closing" d={1} as="h2">
        <span className="title-text">{cl.line}</span>
      </Txt>
      <Txt x={430} y={600} w={540} cls="serif page-intro closing-intro" d={1.3}>
        <p>Thank you for being part of this beautiful chapter in our lives.</p>
        <p>Your presence will make the celebration even more special.</p>
      </Txt>
      <Rule y={680} d={1.6} />
      <Txt x={430} y={720} w={300} cls="caps s-venue" d={1.8}>
        <Label>{cl.rsvp}</Label>
      </Txt>
      <Txt x={430} y={752} w={440} cls="venue-sm" d={2}>
        {cl.contacts.length ? <Lines list={cl.contacts} /> : <p className="tba">Contact details to be added</p>}
      </Txt>
      <Txt x={430} y={900} w={540} cls="title-sm hashtag" d={2.4} as="p">
        <span className="title-text">{w.hashtag}</span>
      </Txt>
    </Poster>
  )
}
