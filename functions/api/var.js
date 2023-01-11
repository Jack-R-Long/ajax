export function onRequest(context) {
  return new Response(`Hello, Secret! ${context.env.SECRET}`, {
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
  });
}
