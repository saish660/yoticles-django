async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    show_snackbar('copied to clipboard', 3000)
  }
  catch (error) {
    show_snackbar(error)
  }
}
