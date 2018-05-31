export default function (str) {
  const arr = str.split('---');
  return arr.slice(-3);
}
