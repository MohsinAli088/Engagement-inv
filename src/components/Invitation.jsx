import { img } from '../asset'
import { invite as c } from '../data/content'
import { Label, P, Poster, Rule, Star, T, Txt } from './poster'

export default function Invitation({ open }) {
  return (
    <Poster open={open} bg="eng/bg.jpg" label="Engagement invitation">
      {/* Om */}
        <div className="rv om" style={{ ...P(427, 76), ...T(1.9) }} lang="sa">
          ॐ
        </div>

        <Txt x={427} y={137} w={260} cls="deva s-invoc" d={2.2} as="p">
          {c.invocation}
        </Txt>

        <Txt x={427} y={193} w={420} cls="deva s-shloka" d={2.5} as="p">
          {c.shloka}
        </Txt>
        <Txt x={427} y={216} w={420} cls="serif s-meaning" d={2.7}>
          {c.meaning.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Txt>

        <Txt x={433} y={278} w={520} cls="caps s-blessing" d={3}>
          {c.blessing.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Txt>

        <h1 className="rv title" style={{ ...P(440, 332), ...T(3.4) }}>
          <span className="title-text">{c.title}</span>
        </h1>

        <Txt x={430} y={412} w={330} cls="caps s-beloved" d={3.9}>
          <Label>{c.beloved}</Label>
        </Txt>

        <Txt x={239} y={455} w={320} cls="name" d={4.1} as="h2">
          {c.bride.name}
        </Txt>
        <Txt x={617} y={455} w={320} cls="name" d={4.3} as="h2">
          {c.groom.name}
        </Txt>

        <div className="rv ring-wrap" style={{ ...P(395, 436), ...T(4.5) }}>
          <img src={img('eng/ring.png')} alt="Engagement ring" className="ring-img" />
        </div>
        <Star x={452} y={448} s={15} d={0.5} cls="spark-ring" />
        <Star x={405} y={505} s={10} d={2} cls="spark-ring" />

        {/* bride's side */}
        <Txt x={222} y={514} w={140} cls="caps s-rel" d={4.7}>
          <Label>{c.bride.rel}</Label>
        </Txt>
        <Txt x={224} y={541} w={230} cls="caps s-parent" d={4.9}>
          {c.bride.parents.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Txt>
        {c.brideSide.map(([role, name], i) => (
          <Txt key={role} x={224} y={[635, 683, 736][i]} w={200} cls="member" d={5.1 + i * 0.15}>
            <p className="role">{role}</p>
            <p className="who">{name}</p>
          </Txt>
        ))}
        <Txt x={224} y={794} w={200} cls="member" d={5.6}>
          <p className="role">Residence</p>
          <p className="who">{c.brideResidence[0]}</p>
        </Txt>

        {/* tagline in the cartouche */}
        <Txt x={428} y={623} w={100} cls="serif tagline" d={5.2}>
          {c.tagline}
        </Txt>
        <svg className="rv heart" style={{ ...P(428, 779), ...T(5.6) }} viewBox="0 0 24 22" aria-hidden="true">
          <path
            d="M12 20C5 14.5 2 11.5 2 7.6 2 4.8 4.200 3 6.700 3c2 0 3.700 1.100 5.300 3.200C13.600 4.100 15.300 3 17.300 3 19.800 3 22 4.800 22 7.600 22 11.500 19 14.500 12 20z"
            fill="none"
            stroke="#b8893b"
            strokeWidth="1.500"
          />
        </svg>

        {/* groom's side */}
        <Txt x={580} y={514} w={140} cls="caps s-rel" d={4.7}>
          <Label>{c.groom.rel}</Label>
        </Txt>
        <Txt x={622} y={541} w={260} cls="caps s-parent" d={4.9}>
          {c.groom.parents.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Txt>
        <Txt x={624} y={660} w={200} cls="member" d={5.3}>
          <p className="role">{c.groomSide[0][0]}</p>
          <p className="who">{c.groomSide[0][1]}</p>
        </Txt>
        <Txt x={632} y={781} w={200} cls="member" d={5.6}>
          <p className="role">Residence</p>
          {c.groomResidence.map((l) => (
            <p key={l} className="who">
              {l}
            </p>
          ))}
        </Txt>

        {/* date */}
        <Txt x={431} y={845} w={300} cls="caps s-save" d={6}>
          <Label>{c.saveTheDate}</Label>
        </Txt>
        <Txt x={431} y={868} w={300} cls="date" d={6.2}>
          <span>{c.date[0]}</span>
          <i />
          <span>{c.date[1]}</span>
          <i />
          <span>{c.date[2]}</span>
        </Txt>
        <Txt x={431} y={916} w={300} cls="caps s-weekday" d={6.4}>
          {c.weekday}
        </Txt>
        <Txt x={429} y={943} w={254} cls="pill" d={6.6}>
          <span>{c.time}</span>
        </Txt>

        {/* venue */}
        <Txt x={430} y={999} w={260} cls="caps s-venue" d={6.9}>
          <Label>{c.venueLabel}</Label>
        </Txt>
        <Txt x={430} y={1020} w={420} cls="venue" d={7.1} as="h3">
          {c.venue}
        </Txt>
        <Txt x={430} y={1066} w={420} cls="caps s-address" d={7.3}>
          {c.address.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Txt>
        <Rule y={1109} d={7.5} />

        {/* reminder */}
        <Txt x={430} y={1139} w={420} cls="caps s-remind" d={7.8}>
          {c.reminderTitle}
        </Txt>
        <Txt x={430} y={1156} w={420} cls="deva s-remind-sa" d={8}>
          {c.reminder.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Txt>
        <Txt x={430} y={1203} w={440} cls="serif s-remind-en" d={8.2}>
          {c.reminderMeaning.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </Txt>
    </Poster>
  )
}
