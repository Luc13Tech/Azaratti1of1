// Numéro WhatsApp fonctionnel pour les commandes
const WA_NUMBER = "221779398484";

export function sendCartToWhatsApp(items, totalUSD, lang, t, tF) {
  const lines = [];
  lines.push(`*${t("whatsapp.header")}*`);
  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("");
  items.forEach((item, idx) => {
    const name = tF ? tF(item.name) : (item.name?.[lang] || item.name?.fr || "Article");
    lines.push(`${idx + 1}. *${name}*`);
    lines.push(`   ${t("whatsapp.edition")} : ${item.edition}`);
    lines.push(`   ${t("whatsapp.color")} : ${item.color}`);
    lines.push(`   ${t("whatsapp.size")} : ${item.size}`);
    lines.push(`   ${t("whatsapp.qty")} : ${item.qty}`);
    lines.push(`   ${t("whatsapp.unitPrice")} : $${item.priceUSD} USD`);
    lines.push("");
  });
  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push(`*${t("whatsapp.total")} : $${totalUSD.toLocaleString()} USD*`);
  lines.push("");
  lines.push(t("whatsapp.closing"));
  const message = encodeURIComponent(lines.join("\n"));
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
}

export function openWhatsApp(message = "") {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank", "noopener,noreferrer");
}
