/* global React, Icon, Reveal, Magnetic, Tilt */
const { useState } = React;

const Field = ({ id, label, type = "text", area = false, value, onChange, required }) => {
  const [focus, setFocus] = useState(false);
  const filled = !!value;
  const cls = `field ${focus ? "is-focus" : ""} ${filled ? "is-filled" : ""}`;
  const Tag = area ? "textarea" : "input";
  return (
    <label className={cls} htmlFor={id}>
      <span className="field__label">{label}</span>
      <Tag
        id={id}
        className={area ? "field__area" : "field__input"}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        required={required}
        rows={area ? 4 : undefined}
      />
      <span className="field__rule" aria-hidden="true"/>
    </label>
  );
};

const KIND_OPTIONS = [
  { id: "brand",    label: "Brand brief" },
  { id: "creator",  label: "Creator intro" },
  { id: "question", label: "Just a question" },
];

const Contact = () => {
  const [kind, setKind] = useState("brand");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName(""); setEmail(""); setBudget(""); setMessage("");
    }, 5200);
  };

  return (
    <section id="contact" data-screen-label="06 Contact" className="container">
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720, marginBottom: 56 }}>
        <Reveal variant="up"><span className="section-eyebrow in">How to start</span></Reveal>
        <Reveal variant="up" delay={80}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 0.96,
            letterSpacing: "-0.025em", color: "var(--fg)", margin: 0,
          }}>
            Three ways <span style={{ color: "var(--accent)" }}>in.</span>
          </h2>
        </Reveal>
        <Reveal variant="up" delay={140}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55,
            color: "var(--fg-muted)", margin: 0, maxWidth: 580,
          }}>
            Reply with whatever. Every email gets read. No deck required, no sales call before there's anything to discuss.
          </p>
        </Reveal>
      </div>

      <div className="contact-grid">
        <Reveal variant="up" delay={60} style={{ height: "100%" }}>
          <Tilt max={2.5} className="contact-card" style={{ padding: 32, height: "100%" }}>
            <span className="tag" style={{ color: "var(--fg-muted)" }}>Send a note</span>
            <h3 className="title" style={{ marginBottom: 24 }}>Reply within 24h, weekdays.</h3>

            <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
              {KIND_OPTIONS.map(o => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setKind(o.id)}
                  style={{
                    height: 32,
                    padding: "0 14px",
                    borderRadius: 999,
                    border: kind === o.id ? "1px solid var(--border-strong)" : "1px solid var(--border-neutral)",
                    background: kind === o.id ? "var(--surface-hover)" : "transparent",
                    color: kind === o.id ? "var(--fg)" : "var(--fg-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 220ms var(--ease-out-strong), border-color 220ms var(--ease-out-strong), color 220ms var(--ease-out-strong)",
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <form className="form" onSubmit={onSubmit}>
              <div className="form__row">
                <Field id="c-name" label="Name" value={name} onChange={setName}/>
                <Field id="c-email" type="email" label="Email" value={email} onChange={setEmail} required/>
              </div>
              {kind === "brand" && (
                <Field id="c-budget" label="Budget range — usd" value={budget} onChange={setBudget}/>
              )}
              {kind === "creator" && (
                <Field id="c-budget" label="Channel — url" value={budget} onChange={setBudget}/>
              )}
              <Field
                id="c-msg"
                area
                label={kind === "brand" ? "Brief — what you're launching" : kind === "creator" ? "What you make + usual rate" : "Anything at all"}
                value={message}
                onChange={setMessage}
                required
              />
              <div className="form__send">
                <span>Sent to damir@dms.[domain]</span>
                <Magnetic type="submit" strength={0.28}>
                  Send <Icon name="arrow-right" size={14}/>
                </Magnetic>
              </div>
            </form>
            <div className={`confirm ${sent ? "in" : ""}`}>
              <Icon name="check" size={14}/> Logged. Reply within 24h, weekdays.
            </div>
          </Tilt>
        </Reveal>

        <Reveal variant="up" delay={140} style={{ height: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
            {[
              { tag: "01 — Brand brief",     title: "Send what you're launching.",   body: "Budget range and category. Reply in 24h with a fit assessment and a proposed scope." },
              { tag: "02 — Creator intro",   title: "Send your channel.",            body: "Your usual rate and one brand you'd want to work with. Reply with whether there's a placement worth pitching." },
              { tag: "03 — Just a question", title: "Reply with whatever.",          body: "Every email gets read. No deck required, no sales call before there's anything to discuss." },
            ].map((c, i) => (
              <Tilt key={i} max={3} className="contact-card" style={{ padding: 28, flex: "1 1 0", minHeight: 0 }}>
                <span className="tag" style={{ color: "var(--fg-muted)" }}>{c.tag}</span>
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg)", margin: "14px 0 10px" }}>
                  {c.title}
                </h4>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, lineHeight: 1.55, color: "var(--fg-muted)", margin: 0 }}>
                  {c.body}
                </p>
              </Tilt>
            ))}
            <div style={{
              marginTop: 4,
              padding: "16px 24px",
              border: "1px solid var(--border-neutral)",
              borderRadius: 8,
              background: "var(--surface)",
              fontFamily: "var(--font-mono)", fontSize: 13,
              color: "var(--fg-muted)", letterSpacing: "0.04em",
              display: "flex", alignItems: "center", gap: 12,
              flexShrink: 0,
            }}>
              <Icon name="mail" size={14}/>
              Or write directly — <span style={{ color: "var(--fg)" }}>damir@dms.[domain]</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.Contact = Contact;
