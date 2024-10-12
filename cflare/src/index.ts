/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {

	AI: Ai;
  }
  
  export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {
			stream: false,
			max_tokens: 512,
			messages: [
			  { role: "system", content: "You are a helpful food picture inspector. You are tasked with inspecting a food picture and detecting what it contains." },
			  { role: "user", content: `Inspect this food picture and detect what it contains. List the components you see, and the ingredients that they are made of. 
		  Infer from what you see what other ingredient the food might contain. 
		  Be as precise and concise as you can.
		  The image URL: https://www.pexels.com/photo/flat-lay-photography-of-vegetable-salad-on-plate-1640777/ `}
			],
		  });
  
	  return new Response(JSON.stringify(response));
	},
  } satisfies ExportedHandler<Env>;