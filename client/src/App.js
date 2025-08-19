import React, { useEffect, useState } from "react";
import { listWines, createWine } from "./api";

export default function App() {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", region: "", notes: "" });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listWines();
        setWines(data);
      } catch (e) {
        setErr(e.message || "Failed to load wines");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const saved = await createWine(form);
      setWines((prev) => [saved, ...prev]);
      setForm({ name: "", region: "", notes: "" });
    } catch (e) {
      setErr(e.message || "Failed to save wine");
    }
  }

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Wine Club</h1>
      <p style={{ color: "#666" }}>
        Backend: <code>{process.env.REACT_APP_API_URL}</code>
      </p>

      <form onSubmit={onSubmit}
        style={{ display: "grid", gap: 8, padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          placeholder="Region"
          value={form.region}
          onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
          required
        />
        <textarea
          placeholder="Notes"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
        <button type="submit">Add Wine</button>
      </form>

      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}
      {loading ? (
        <p>Loading wines…</p>
      ) : wines.length === 0 ? (
        <p>No wines yet — add one above.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
          {wines.map((w) => (
            <li key={w._id} style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
              <div style={{ fontWeight: 600 }}>{w.name}</div>
              <div style={{ color: "#666" }}>{w.region}</div>
              {w.notes && <div style={{ marginTop: 4 }}>{w.notes}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
