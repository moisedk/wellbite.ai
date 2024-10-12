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
interface RequestBody {
	imageUrl: string;
}
export default {
	async fetch(request, env): Promise<Response> {
		// Check if the method is POST
		if (request.method === 'OPTIONS') {
			return new Response(null, {
			  headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
			  },
			});
		  }
		if (request.method === 'POST') {
			try {
				// Parse the request body to get the image URL
				const body = await request.json() as RequestBody;
				// Ensure the image URL is provided
				if (!body.imageUrl) {
					return new Response(JSON.stringify({ error: 'Image URL not provided' }), { status: 400 });
				} 

				// Call the AI service with the image URL
				const response = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {
					stream: false,
					max_tokens: 512,
					messages: [
						{
							role: "system",
							content: "You are a helpful food picture inspector. You are tasked with inspecting a food picture and detecting what it contains."
						},
						{
							role: "user",
							content: `Inspect this food picture and detect what it contains. List the components you see, and the ingredients that they are made of. 
										Infer from what you see what other ingredients the food might contain. 
										Be as precise and concise as you can. 
										The image URL: ${body.imageUrl}`
						}
					],
				}
			);
			// Add CORS headers to the response
			const headers = new Headers({
				'Access-Control-Allow-Origin': '*', 
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Content-Type': 'application/json'
			  });

				// Return the AI response
				return new Response(JSON.stringify(response), { status: 200, headers: headers });
			} catch (error: any) {
				// Handle any errors
				return new Response(JSON.stringify({ error: error.message }), { status: 500 });
			}
		} else {
			// Return a 405 if the method is not POST
			return new Response('Method Not Allowed', { status: 405 });
		}
	}
} satisfies ExportedHandler<Env>;
