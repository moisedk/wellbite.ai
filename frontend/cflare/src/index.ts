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
	imageUrl?: string;
	foodList?: string[];
	foodSource: 'image' | 'text'; // New parameter to specify the source
	restrictions?: string;
  }
  
  export default {
	async fetch(request, env): Promise<Response> {
	  const url = new URL(request.url); // Parse the request URL
	  const pathname = url.pathname;    // Get the path from the request URL
  
	  // Handle CORS preflight requests
	  if (request.method === 'OPTIONS') {
		return new Response(null, {
		  headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		  },
		});
	  }
  
	  // Handle different endpoints based on the pathname
	  if (request.method === 'POST') {
		try {
		  const body = await request.json() as RequestBody;
  
		  // Route to different endpoints based on pathname
		//   if (pathname === '/analyze-food') {
			// Ensure foodSource is provided
			if (!body.foodSource) {
			  return new Response(JSON.stringify({ error: 'foodSource not provided' }), { status: 400 });
			}
  
			let prompt: string;
  
			// Create a prompt based on the foodSource
			if (body.foodSource === 'image') {
			  // Ensure the image URL is provided
			  if (!body.imageUrl) {
				return new Response(JSON.stringify({ error: 'Image URL not provided' }), { status: 400 });
			  }
  
			  prompt = `Inspect this food picture and detect what it contains. If the image is not a food picture, then say it. If the the food looks safe, identify the type of dish and identify if there is any ingredient not seen on the picture that may endanger the life of the customer. The image URL: ${body.imageUrl}
			  Then, using the doctor-provided restriction in json file: ${body.restrictions}, inform the user if the food is safe to eat. Be sure to provide a reason. Be kind, helpful, and professional.
			  `;
  
			} else if (body.foodSource === 'text') {
			  // Ensure the food list is provided
			  if (!body.foodList || !Array.isArray(body.foodList)) {
				return new Response(JSON.stringify({ error: 'Food list not provided or invalid format' }), { status: 400 });
			  }
  
			  // Create a prompt based on the text food list
			  const foodItems = body.foodList.join(', ');
			  prompt = `From this doctor-provided restriction: ${body.restrictions}, inform the user if this food: ${foodItems} is safe to eat. Be sure to provide a reason for each food item. Be kind, helpful, and professional.`;
			} else {
			  return new Response(JSON.stringify({ error: 'Invalid foodSource provided' }), { status: 400 });
			}
  
			// Call the AI service with the generated prompt
			const response = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {
			  stream: false,
			  max_tokens: 512,
			  messages: [
				{
				  role: "system",
				  content: "You are a helpful food inspector."
				},
				{
				  role: "user",
				  content: prompt
				}
			  ],
			});
  
			// Add CORS headers to the response
			const headers = new Headers({
			  'Access-Control-Allow-Origin': '*',
			  'Content-Type': 'application/json'
			});
  
			return new Response(JSON.stringify(response), { status: 200, headers });
  
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
  
