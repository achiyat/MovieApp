// esbuild.config.js
import esbuild from "esbuild";

// Client-side bundling
esbuild
  .build({
    entryPoints: ["client/src/index.js"], // Client entry point
    bundle: true,
    outfile: "dist/client/client-bundle.js", // Client output file
    minify: true,
    sourcemap: true,
    target: ["chrome58", "firefox57", "safari11", "edge18"], // Ensures compatibility

    // Add loaders for different file types
    loader: {
      ".js": "jsx", // Enable JSX in JS files
      ".png": "file", // Handle image files
      ".jpg": "file", // Handle image files
      ".jpeg": "file", // Handle image files
    },
  })
  .then(() => {
    console.log("Client build completed successfully.");
  })
  .catch((err) => {
    console.error("Client build failed:", err);
    process.exit(1);
  });

// Server-side bundling
esbuild
  .build({
    entryPoints: ["server/index.js"], // Server entry point
    bundle: true,
    platform: "node", // Required for Node.js server bundling
    outfile: "dist/server/server-bundle.js", // Server output file
    external: ["express"], // Don't bundle external node_modules like Express
  })
  .then(() => {
    console.log("Server build completed successfully.");
  })
  .catch((err) => {
    console.error("Server build failed:", err);
    process.exit(1);
  });
