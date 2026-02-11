// English Programming Posts - 2 posts, 1300+ words each

export const enProgrammingPosts = [
    {
        title: 'Mastering TypeScript: From Basics to Advanced Patterns',
        slug: 'mastering-typescript-complete-guide-2024',
        tags: ['TypeScript', 'JavaScript', 'Programming', 'Web Development'],
        excerpt: 'A comprehensive guide to TypeScript covering type system fundamentals, advanced patterns, and real-world best practices for building scalable applications.',
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
        readingTime: 17,
        content: `<h2>Introduction to TypeScript</h2>

<p>TypeScript has become the de facto standard for large-scale JavaScript applications. Developed and maintained by Microsoft, it adds optional static typing to JavaScript, enabling developers to catch errors early, improve code readability, and enhance the development experience with better tooling. Companies like Google, Airbnb, and Slack have adopted TypeScript for their critical projects.</p>

<p>At its core, TypeScript is a superset of JavaScript. Any valid JavaScript code is also valid TypeScript code, which means you can gradually adopt it in existing projects. The TypeScript compiler transforms your code into plain JavaScript that runs anywhere JavaScript runs: browsers, Node.js, or any other JavaScript runtime.</p>

<p>The benefits extend beyond catching typos. TypeScript provides excellent IDE support with intelligent code completion, refactoring tools, and inline documentation. It makes your code self-documenting through type annotations, reducing the need for external documentation while making the codebase easier to navigate for new team members.</p>

<h2>Understanding the Type System</h2>

<p>TypeScript's type system is structural rather than nominal. This means that type compatibility is determined by the shape of the data, not by explicit declarations of inheritance or implementation. Two types are compatible if their shapes are compatible, regardless of their names or where they were defined.</p>

<p>Basic types include primitives like string, number, boolean, null, and undefined. Arrays can be typed as number[] or Array<number>. Tuples allow you to express an array with a fixed number of elements whose types are known. Objects are typed using interface or type declarations that describe their shape.</p>

<p>Union types allow a value to be one of several types, written as string | number. Intersection types combine multiple types into one, written as TypeA & TypeB. Literal types narrow a type to specific values, like "left" | "right" instead of just string.</p>

<p>Type inference is powerful in TypeScript. You don't need to annotate everything; the compiler can often figure out types from context. However, explicit annotations improve readability and serve as documentation, especially for function parameters and return types.</p>

<h2>Interfaces and Type Aliases</h2>

<p>Interfaces define the shape of objects and are extensible through declaration merging. This is useful when working with third-party libraries or when different parts of your codebase need to add properties to the same type. Interfaces can extend other interfaces using the extends keyword.</p>

<p>Type aliases are more flexible and can represent any type, including primitives, unions, and mapped types. They cannot be extended through declaration merging, but they can use intersection types to achieve similar results. For complex types involving conditionals or mapped types, type aliases are necessary.</p>

<p>The choice between interfaces and type aliases often comes down to team preference and specific use cases. Interfaces are generally preferred for object shapes that might be extended, while type aliases excel at union types and complex type transformations. Consistency within a codebase matters more than which you choose.</p>

<h2>Generics: Writing Reusable Code</h2>

<p>Generics allow you to write code that works with multiple types while maintaining type safety. Instead of using any and losing type information, you use type parameters that get filled in when the code is used. This is fundamental to building reusable libraries and utilities.</p>

<p>A simple generic function might accept a type parameter T and return that same type. For example, an identity function that returns its input unchanged can be typed to preserve the specific input type. Array methods like map and filter are generic, preserving type information through transformations.</p>

<p>Constraints on generics ensure that type parameters meet certain requirements. Using extends, you can require that a generic type has certain properties or extends a specific type. Default type parameters provide fallback types when none is explicitly specified.</p>

<p>Generic types can have multiple type parameters and complex relationships between them. Conditional types use the ternary operator syntax to choose types based on conditions. Mapped types and conditional types together enable powerful type transformations.</p>

<h2>Advanced Type Patterns</h2>

<p>Discriminated unions combine union types with a common property that acts as a type guard. Each variant has a literal type for this property, enabling TypeScript to narrow the type based on runtime checks. This pattern is excellent for state management and handling different message types.</p>

<p>Template literal types, introduced in TypeScript 4.1, allow string manipulation at the type level. You can create types that enforce specific string patterns, derive new types from string transformations, and create strongly-typed event handlers or API routes.</p>

<p>The infer keyword in conditional types allows you to extract types from complex structures. You can extract the return type of a function, the element type of an array, or the resolved type of a Promise. Built-in utility types like ReturnType and Parameters use infer internally.</p>

<p>Recursive types reference themselves and are useful for representing tree structures, nested objects, or JSON data. TypeScript now handles recursive types well, though you may need explicit type annotations to help the compiler with complex recursion.</p>

<h2>Type Guards and Narrowing</h2>

<p>Type narrowing is how TypeScript determines more specific types within code blocks. Control flow analysis uses typeof checks, truthiness checks, and other patterns to narrow types automatically. Understanding how narrowing works helps you write code that TypeScript can analyze effectively.</p>

<p>Custom type guards are functions that return a type predicate, written as value is SomeType. Inside the type guard, you perform runtime checks. When the guard returns true, TypeScript narrows the type accordingly. This is essential for complex discriminations that typeof and instanceof cannot handle.</p>

<p>The in operator checks for property existence and narrows types accordingly. For discriminated unions, checking the discriminant property narrows to the specific variant. Exhaustiveness checking with never ensures all union variants are handled in switch statements.</p>

<h2>Working with Third-Party Code</h2>

<p>Declaration files (.d.ts) provide type information for JavaScript libraries. The DefinitelyTyped repository contains community-maintained declarations for thousands of popular packages, installable via npm with the @types prefix. High-quality type declarations make third-party code as type-safe as your own.</p>

<p>When declarations don't exist or are incomplete, you can write your own. Module augmentation extends existing declarations without modifying them. Global augmentation adds types to the global scope. These techniques let you fill gaps in third-party typings.</p>

<p>Sometimes you need to work around the type system. Type assertions with as tell TypeScript to trust your knowledge about a type. The any type opts out of type checking entirely, while unknown is a type-safe alternative that requires narrowing before use. Use these escape hatches sparingly.</p>

<h2>Best Practices for Production</h2>

<p>Strict mode enables the most comprehensive type checking. Start new projects with strict: true and enable individual flags for existing projects. Key strict flags include strictNullChecks, noImplicitAny, and strictFunctionTypes. The temporary overhead of fixing errors pays off in long-term reliability.</p>

<p>Prefer unknown over any for values of uncertain type. unknown forces you to narrow the type before use, catching potential errors at compile time. any spreads through types and undermines the value of TypeScript; reserve it for truly necessary escape hatches.</p>

<p>Use const assertions for literal types. When you declare a value with as const, TypeScript infers the most specific type possible. This is useful for configuration objects, Redux action types, and anywhere you want literal types instead of wider primitive types.</p>

<p>Keep types close to where they're used. For types used only in one file, define them there. For shared types, create dedicated type files or colocate them with related code. Avoid massive types.ts files that become dumping grounds for unrelated types.</p>

<h2>The Future of TypeScript</h2>

<p>TypeScript continues to evolve with JavaScript, implementing new ECMAScript features often before they land in browsers. The TypeScript team prioritizes backwards compatibility, so code written today will continue to work as the language evolves.</p>

<p>Recent releases have focused on performance improvements, better error messages, and new type system features. The satisfies operator helps with type narrowing while preserving literal types. Const type parameters enable better inference for generic functions.</p>

<p>Learning TypeScript is an investment that pays dividends throughout your JavaScript development career. Start with the basics, practice regularly, and gradually explore advanced patterns as your needs grow. The TypeScript community is welcoming and the documentation is excellent. Begin your journey today.</p>`
    },
    {
        title: 'Building Production-Ready REST APIs with Go',
        slug: 'go-rest-api-production-guide-2024',
        tags: ['Go', 'Golang', 'API', 'Backend', 'REST'],
        excerpt: 'Learn how to build scalable, maintainable REST APIs with Go, covering project structure, middleware, database integration, and deployment best practices.',
        coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
        readingTime: 18,
        content: `<h2>Why Go for API Development?</h2>

<p>Go has emerged as a leading choice for building backend services, especially APIs that need to handle high traffic efficiently. Created at Google and used by companies like Uber, Dropbox, and Twitch, Go combines the performance of compiled languages with the simplicity of modern programming languages. Its standard library includes everything needed to build HTTP servers without external dependencies.</p>

<p>The language was designed for simplicity. There's typically one obvious way to do things, reducing debates about coding style and making codebases consistent across teams. The compiler is fast, the tooling is excellent, and the resulting binaries are small and easy to deploy. Goroutines provide lightweight concurrency, perfect for handling thousands of simultaneous API requests.</p>

<p>This guide walks through building a production-ready REST API from scratch. We'll cover project structure, routing, middleware, database operations, authentication, testing, and deployment. By the end, you'll have a solid foundation for building real-world Go services.</p>

<h2>Project Structure and Organization</h2>

<p>Go doesn't prescribe a specific project layout, but certain patterns have emerged as best practices. The standard project layout separates code into packages based on responsibility. cmd contains application entry points, internal holds private application code, and pkg contains code that can be imported by external projects.</p>

<p>For an API, organize code by domain rather than technical layer. Instead of putting all handlers in one package and all services in another, group related code together. A users package contains the handler, service, repository, and models for user-related functionality. This makes the codebase easier to navigate and modify.</p>

<p>Keep the main package thin. It should initialize dependencies, set up configuration, and start the server. All business logic lives in other packages. This separation makes testing easier and allows different entry points (API server, CLI tools, workers) to share code.</p>

<p>Use dependency injection to connect components. Pass dependencies explicitly through constructors rather than using global variables. This makes code testable and dependencies clear. The wire tool from Google can generate dependency injection code automatically.</p>

<h2>HTTP Routing and Handlers</h2>

<p>The standard library's net/http package provides a solid foundation for HTTP servers. For APIs with complex routing needs, popular routers like chi, gorilla/mux, or gin add features like path parameters, method-based routing, and middleware chains while maintaining familiar patterns.</p>

<p>Handlers in Go are functions that accept http.ResponseWriter and *http.Request. The writer is used to send responses; the request contains everything about the incoming request. Keep handlers thin by delegating to service functions for business logic.</p>

<p>JSON serialization uses the encoding/json package. Define struct types for your request and response bodies, with json tags to control serialization. Always validate incoming data before processing. Consider using a validation library like validator for complex validation rules.</p>

<p>Error handling deserves careful design. Define custom error types that carry both user-facing messages and internal details. A centralized error handler middleware can transform errors into appropriate HTTP responses, logging details while returning safe messages to clients.</p>

<h2>Middleware and Cross-Cutting Concerns</h2>

<p>Middleware wraps handlers to add functionality like logging, authentication, CORS, and request tracing. In Go, middleware is simply a function that takes a handler and returns a new handler. Chain middleware to build reusable processing pipelines.</p>

<p>Logging middleware should capture method, path, status code, response time, and request ID for every request. Use structured logging with a library like zerolog or zap for performance and easy parsing. Include trace IDs to correlate logs across services.</p>

<p>Authentication middleware validates credentials and populates the request context with user information. Context is Go's mechanism for carrying request-scoped data and cancellation signals. Use context values sparingly and define typed keys to avoid collisions.</p>

<p>Rate limiting protects your API from abuse. Implement per-client rate limiting using token bucket or sliding window algorithms. Libraries like golang/time/rate provide building blocks. In production, consider distributed rate limiting using Redis if you run multiple API instances.</p>

<h2>Database Integration</h2>

<p>Go's database/sql package provides a general interface for SQL databases. It handles connection pooling, prepared statements, and transactions. For most projects, a driver (like pq for PostgreSQL) plus a query builder or light ORM (like sqlx or sqlc) provides the right balance of control and convenience.</p>

<p>sqlc generates type-safe Go code from SQL queries. You write SQL, and sqlc generates Go functions with proper types. This approach catches SQL errors at compile time, provides type safety, and doesn't hide what SQL actually runs. It's particularly effective for read-heavy APIs with complex queries.</p>

<p>Connection management matters in production. Configure pool size based on expected load. Set connection timeouts to avoid hanging on database issues. Implement health checks that verify database connectivity. Use read replicas for read-heavy workloads.</p>

<p>Migrations define database schema changes as versioned files. Tools like golang-migrate or goose apply migrations in order and track which have run. Store migrations in version control and apply them as part of deployment. Never modify production schemas manually.</p>

<h2>Authentication and Security</h2>

<p>JWT (JSON Web Tokens) are common for stateless API authentication. The user logs in with credentials, receives a signed token, and includes it in subsequent requests. The server verifies the signature without database lookups. Use short expiration times and implement refresh tokens for long sessions.</p>

<p>Never store passwords directly. Use bcrypt or argon2 for password hashing. These algorithms are deliberately slow to make brute force attacks impractical. Set appropriate cost factors based on your performance requirements. Hash on the server, never accept pre-hashed passwords.</p>

<p>HTTPS is mandatory for production APIs. Terminate TLS at a load balancer or reverse proxy, or use Go's built-in TLS support. Redirect HTTP to HTTPS. Set security headers including Strict-Transport-Security, Content-Security-Policy, and X-Content-Type-Options.</p>

<p>Input validation prevents injection attacks. Validate and sanitize all user input. Use parameterized queries to prevent SQL injection. Encode output appropriately to prevent XSS. Implement request size limits. Reject unexpected content types.</p>

<h2>Testing Strategies</h2>

<p>Go has excellent built-in testing support. Test files live alongside the code they test with _test.go suffix. The go test command discovers and runs tests automatically. Table-driven tests are idiomatic in Go, defining test cases as data and iterating through them.</p>

<p>Unit tests verify individual functions in isolation. Mock dependencies using interfaces. The standard testing package works well; testify adds helpful assertions and mocking utilities. Aim for high coverage of critical paths but don't chase 100% coverage blindly.</p>

<p>Integration tests verify that components work together. Test handlers using httptest.NewRecorder to capture responses without network overhead. Test database code against a real database, using transactions to isolate tests. Docker makes it easy to spin up test databases.</p>

<p>End-to-end tests verify the entire system. Run your API as a subprocess and make real HTTP requests. These tests are slow but valuable for catching integration issues. Include them in CI but perhaps not on every commit.</p>

<h2>Deployment and Operations</h2>

<p>Go compiles to static binaries, simplifying deployment. Build once, copy the binary to production servers, and run. No runtime dependencies besides the OS. Cross-compilation is trivial: build Linux binaries on Mac or Windows with GOOS and GOARCH environment variables.</p>

<p>Docker containers package your binary with any runtime requirements. Use multi-stage builds: compile in a full Go image, then copy the binary to a minimal base image like alpine or distroless. The resulting container is tiny and secure with minimal attack surface.</p>

<p>Configuration should come from the environment. Use environment variables for sensitive data and feature flags. Libraries like viper read from environment, files, and remote config stores. Never commit secrets to version control; use secret management tools.</p>

<p>Implement health checks and readiness endpoints. Kubernetes and load balancers use these to know when your service is ready and healthy. Export metrics in Prometheus format for monitoring. Add structured logging for debugging and alerting. Run profiling endpoints in development to identify bottlenecks.</p>

<h2>Conclusion: Building for Scale</h2>

<p>Go is an excellent choice for building APIs that need to scale. Its simplicity reduces bugs and onboarding time. Its performance handles high traffic without complex infrastructure. Its tooling makes development and deployment smooth.</p>

<p>Start simple and add complexity only when needed. Go's standard library handles many use cases without external dependencies. When you do add dependencies, choose well-maintained libraries with clear APIs. The Go community values simplicity and clarity.</p>

<p>Building production-ready APIs is about more than code. It's about observability, security, reliability, and maintainability. The patterns in this guide provide a foundation. Apply them thoughtfully, measure constantly, and iterate based on real-world feedback. Your future self and your users will thank you.</p>`
    }
];
