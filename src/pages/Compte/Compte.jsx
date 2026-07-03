import React, { useState, useEffect } from "react";
import { useLang } from "../../context/LangContext.jsx";
import { useAccount } from "../../context/AccountContext.jsx";
import { ordersAPI } from "../../api/api.js";
import "./Compte.css";

export default function Compte() {
  const { t } = useLang();
  const { user, signup, login, logout } = useAccount();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      ordersAPI.myOrders()
        .then(({ data }) => setOrders(data.orders || []))
        .catch(() => {});
    }
  }, [user]);

  function onChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (tab === "login") {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.email, form.password);
      }
    } catch (err) {
      const msg = err?.response?.data?.error || "";
      if (msg.includes("existe")) setError(t("account.errorExists"));
      else if (msg.includes("incorrect")) setError(t("account.errorInvalid"));
      else setError(t("account.errorServer"));
    } finally {
      setLoading(false);
    }
  }

  /* ── Connected state ── */
  if (user) return (
    <main className="page compte">
      <div className="container compte__inner">
        <div className="compte__welcome">
          <p className="eyebrow">{t("account.loggedAs")}</p>
          <h1 className="display-2">{user.name}</h1>
          <p className="compte__email">{user.email}</p>
          <button className="btn btn-outline btn-sm" onClick={logout}>{t("account.logoutBtn")}</button>
        </div>

        {/* Orders */}
        <div className="compte__section">
          <h2 className="compte__section-title">{t("account.ordersTitle")}</h2>
          {orders.length === 0 ? (
            <p className="compte__empty">{t("account.ordersEmpty")}</p>
          ) : (
            <div className="compte__orders">
              {orders.map(o => (
                <div key={o._id} className="compte__order">
                  <div className="compte__order-header">
                    <span className="compte__order-date">{new Date(o.createdAt).toLocaleDateString()}</span>
                    <span className="compte__order-total">${o.totalUSD?.toLocaleString()} USD</span>
                    <span className="compte__order-status">{o.status}</span>
                  </div>
                  <div className="compte__order-items">
                    {o.items?.map((item, i) => (
                      <p key={i} className="compte__order-item">
                        {item.name?.fr || "Article"} — {item.size} — {item.color} × {item.qty}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );

  /* ── Auth form ── */
  return (
    <main className="page compte">
      <div className="container compte__inner">
        <div className="compte__auth-wrap">
          <div className="compte__auth-header">
            <img src="/images/logo/azaratti-logo.jpg" alt="AzaRatti" className="compte__auth-logo" />
            <h1 className="compte__auth-title">{t("account.title")}</h1>
          </div>

          {/* Tabs */}
          <div className="compte__tabs">
            <button className={`compte__tab ${tab==="login"?"active":""}`} onClick={() => { setTab("login"); setError(""); }}>
              {t("account.loginTab")}
            </button>
            <button className={`compte__tab ${tab==="signup"?"active":""}`} onClick={() => { setTab("signup"); setError(""); }}>
              {t("account.signupTab")}
            </button>
          </div>

          <form className="compte__form" onSubmit={handleSubmit}>
            {tab === "signup" && (
              <div className="field">
                <label>{t("account.name")}</label>
                <input name="name" value={form.name} onChange={onChange} required placeholder="Votre nom complet" />
              </div>
            )}
            <div className="field">
              <label>{t("account.email")}</label>
              <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="votre@email.com" />
            </div>
            <div className="field">
              <label>{t("account.password")}</label>
              <input type="password" name="password" value={form.password} onChange={onChange} required minLength={8} placeholder="••••••••" />
              {tab==="signup" && <span className="compte__hint">{t("account.passwordMin")}</span>}
            </div>

            {error && <p className="compte__error">{error}</p>}

            <button type="submit" className="btn btn-dark compte__submit" disabled={loading}>
              {loading ? t("common.loading") : (tab==="login" ? t("account.loginBtn") : t("account.signupBtn"))}
            </button>
          </form>

          <button className="compte__switch" onClick={() => { setTab(tab==="login"?"signup":"login"); setError(""); }}>
            {tab === "login" ? t("account.switchSignup") : t("account.switchLogin")}
          </button>
        </div>
      </div>
    </main>
  );
}
