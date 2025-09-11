export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    console.error("Clipboard API não suportada neste navegador.");
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Erro ao copiar para a área de transferência:", err);
    return false;
  }
}
