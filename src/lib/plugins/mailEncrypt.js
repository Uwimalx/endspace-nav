export const handleEmailClick = (e, ref, email) => {
  if (e) e.preventDefault()
  if (email) {
    window.location.href = `mailto:${email}`
  }
}
