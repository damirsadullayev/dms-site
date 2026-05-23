"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Icon } from "./Icon";
import { Reveal, Tilt } from "@/lib/motion-kit";
import { supabase } from "@/lib/supabase";

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  area?: boolean;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

const Field = ({
  id,
  label,
  type = "text",
  area = false,
  value,
  onChange,
  required,
}: FieldProps) => {
  const [focus, setFocus] = useState(false);
  const filled = !!value;
  const cls = `field ${focus ? "is-focus" : ""} ${filled ? "is-filled" : ""}`;
  return (
    <label className={cls} htmlFor={id}>
      <span className="field__label">{label}</span>
      {area ? (
        <textarea
          id={id}
          className="field__area"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required={required}
          rows={4}
        />
      ) : (
        <input
          id={id}
          className="field__input"
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required={required}
        />
      )}
      <span className="field__rule" aria-hidden="true" />
    </label>
  );
};

interface KindOption {
  id: string;
  label: string;
}

const KIND_OPTIONS: KindOption[] = [
  { id: "brand", label: "Brand brief" },
  { id: "creator", label: "Creator intro" },
  { id: "question", label: "Just a question" },
];

export const Contact = () => {
  // Init pulse (per fix spec).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {}, 50);
    return () => clearTimeout(timer);
  }, []);

  const [kind, setKind] = useState("brand");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !message.trim() || submitting) return;

    if (!turnstileToken) {
      setError("Please complete the security check.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("leads").insert({
      name,
      email,
      type: kind,
      message,
      turnstile_token: turnstileToken,
      created_at: new Date().toISOString(),
    });

    setSubmitting(false);

    if (insertError) {
      setError("Could not send. Try again or email directly.");
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setBudget("");
    setMessage("");
    setTurnstileToken("");

    setTimeout(() => setSubmitted(false), 5200);
  };

  return (
    <section id="contact" data-screen-label="06 Contact" className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: 720,
          marginBottom: 56,
        }}
      >
        <Reveal variant="up">
          <span className="section-eyebrow in">How to start</span>
        </Reveal>
        <Reveal variant="up" delay={80}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(40px, 5.5vw, 76px)",
              lineHeight: 0.96,
              letterSpacing: "-0.025em",
              color: "var(--fg)",
              margin: 0,
            }}
          >
            Three ways <span style={{ color: "var(--accent)" }}>in.</span>
          </h2>
        </Reveal>
        <Reveal variant="up" delay={140}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--fg-muted)",
              margin: 0,
              maxWidth: 580,
            }}
          >
            Reply with whatever. Every email gets read. No deck required, no
            sales call before there&apos;s anything to discuss.
          </p>
        </Reveal>
      </div>

      <div className="contact-grid">
        <Reveal variant="up" delay={60} style={{ height: "100%" }}>
          <Tilt
            max={2.5}
            className="contact-card"
            style={{ padding: 32, height: "100%" }}
          >
            <span className="tag" style={{ color: "var(--fg-muted)" }}>
              Send a note
            </span>
            <h3 className="title" style={{ marginBottom: 24 }}>
              Reply within 24h, weekdays.
            </h3>

            <div
              style={{
                display: "flex",
                gap: 6,
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
              {KIND_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setKind(o.id)}
                  style={{
                    height: 32,
                    padding: "0 14px",
                    borderRadius: 999,
                    border:
                      kind === o.id
                        ? "1px solid var(--border-strong)"
                        : "1px solid var(--border-neutral)",
                    background:
                      kind === o.id ? "var(--surface-hover)" : "transparent",
                    color: kind === o.id ? "var(--fg)" : "var(--fg-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition:
                      "background 220ms var(--ease-out-strong), border-color 220ms var(--ease-out-strong), color 220ms var(--ease-out-strong)",
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <form className="form" onSubmit={onSubmit}>
              <div className="form__row">
                <Field id="c-name" label="Name" value={name} onChange={setName} />
                <Field
                  id="c-email"
                  type="email"
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  required
                />
              </div>
              {kind === "brand" && (
                <Field
                  id="c-budget"
                  label="Budget range — usd"
                  value={budget}
                  onChange={setBudget}
                />
              )}
              {kind === "creator" && (
                <Field
                  id="c-budget"
                  label="Channel — url"
                  value={budget}
                  onChange={setBudget}
                />
              )}
              <Field
                id="c-msg"
                area
                label={
                  kind === "brand"
                    ? "Brief — what you're launching"
                    : kind === "creator"
                    ? "What you make + usual rate"
                    : "Anything at all"
                }
                value={message}
                onChange={setMessage}
                required
              />
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken("")}
                onError={() => setTurnstileToken("")}
                options={{ theme: "dark" }}
              />
              <div className="form__send">
                <span>Sent to damir@dmsgroup.space</span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-sm text-[#0a0a0a] bg-[#c8ff00] border-2 border-[#0a0a0a] shadow-[0_4px_0_0_#0a0a0a] cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_5px_0_0_#0a0a0a] active:translate-y-0.5 active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_0_0_#0a0a0a]"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  {submitting ? "Sending…" : "Send message"}
                  <ArrowRight size={16} strokeWidth={2} />
                </button>
              </div>
            </form>
            <div
              className={`confirm ${submitted ? "in" : ""}`}
              style={{ color: "#c8ff00" }}
            >
              <Icon name="check" size={14} /> Message sent.
            </div>
            <div
              className={`confirm ${error ? "in" : ""}`}
              style={{ color: "#ff4d4d" }}
              role="alert"
            >
              {error}
            </div>
          </Tilt>
        </Reveal>

        <Reveal variant="up" delay={140} style={{ height: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              height: "100%",
            }}
          >
            {[
              {
                tag: "01 — Brand brief",
                title: "Send what you're launching.",
                body: "Budget range and category. Reply in 24h with a fit assessment and a proposed scope.",
              },
              {
                tag: "02 — Creator intro",
                title: "Send your channel.",
                body: "Your usual rate and one brand you'd want to work with. Reply with whether there's a placement worth pitching.",
              },
              {
                tag: "03 — Just a question",
                title: "Reply with whatever.",
                body: "Every email gets read. No deck required, no sales call before there's anything to discuss.",
              },
            ].map((c, i) => (
              <Tilt
                key={i}
                max={3}
                className="contact-card"
                style={{ padding: 28, flex: "1 1 0", minHeight: 0 }}
              >
                <span className="tag" style={{ color: "var(--fg-muted)" }}>
                  {c.tag}
                </span>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: 24,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "var(--fg)",
                    margin: "14px 0 10px",
                  }}
                >
                  {c.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--fg-muted)",
                    margin: 0,
                  }}
                >
                  {c.body}
                </p>
              </Tilt>
            ))}
            <div
              style={{
                marginTop: 4,
                padding: "16px 24px",
                border: "1px solid var(--border-neutral)",
                borderRadius: 8,
                background: "var(--surface)",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--fg-muted)",
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0,
              }}
            >
              <Icon name="mail" size={14} />
              Or write directly —{" "}
              <span style={{ color: "var(--fg)" }}>damir@dmsgroup.space</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
