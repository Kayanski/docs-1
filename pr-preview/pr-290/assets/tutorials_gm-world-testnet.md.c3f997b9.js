import{_ as s,o as a,c as e,X as o}from"./chunks/framework.d54ccbe1.js";const n="/pr-preview/pr-290/gm/gm.png",h=JSON.parse('{"title":"GM world rollup: Part two","description":"","frontmatter":{"head":[["meta",{"name":"og:title","content":"GM world rollup: Part two | Rollkit"},{"name":"og:description","content":false}]]},"headers":[],"relativePath":"tutorials/gm-world-testnet.md","filePath":"tutorials/gm-world-testnet.md","lastUpdated":1704581060000}'),l={name:"tutorials/gm-world-testnet.md"},t=o(`<h1 id="gm-world-rollup-part-two" tabindex="-1">GM world rollup: Part two <a class="header-anchor" href="#gm-world-rollup-part-two" aria-label="Permalink to &quot;GM world rollup: Part two&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This tutorial is under construction. 🏗️</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>The script for this tutorial is built for Celestia&#39;s <a href="https://docs.celestia.org/nodes/arabica-devnet" target="_blank" rel="noreferrer">Arabica devnet</a>.</p></div><h2 id="deploying-to-a-celestia-testnet" tabindex="-1">Deploying to a Celestia testnet <a class="header-anchor" href="#deploying-to-a-celestia-testnet" aria-label="Permalink to &quot;Deploying to a Celestia testnet&quot;">​</a></h2><p>This tutorial is part two of the GM world rollup tutorials. In this tutorial, it is expected that you&#39;ve completed <a href="./gm-world">part one</a> of the tutorial and are familiar with running a local rollup devnet.</p><h3 id="run-celestia-node" tabindex="-1">🪶 Run a Celestia light node <a class="header-anchor" href="#run-celestia-node" aria-label="Permalink to &quot;🪶 Run a Celestia light node {#run-celestia-node}&quot;">​</a></h3><p>Follow instructions to install and start your Celestia data availability layer light node selecting the Arabica network. You can find instructions to install and run the node <a href="https://docs.celestia.org/nodes/light-node" target="_blank" rel="noreferrer">here</a>.</p><p>After you have Go and Ignite CLI installed, and your Celestia Light Node running on your machine, you&#39;re ready to build, test, and launch your own sovereign rollup.</p><p>An example start command on <code>arabica-9</code> would look like this:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">celestia</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">light</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--p2p.network</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">arabica</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">--core.ip</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">validator-1.celestia-arabica-11.com</span></span></code></pre></div><h4 id="start-your-sovereign-rollup" tabindex="-1">🟢 Start your sovereign rollup <a class="header-anchor" href="#start-your-sovereign-rollup" aria-label="Permalink to &quot;🟢 Start your sovereign rollup {#start-your-sovereign-rollup}&quot;">​</a></h4><p>We have a handy <code>init-testnet.sh</code> found in this repo <a href="https://github.com/rollkit/docs/tree/main/scripts/gm" target="_blank" rel="noreferrer">here</a>.</p><p>We can copy it over to our directory with the following commands:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># From inside the \`gm\` directory</span></span>
<span class="line"><span style="color:#FFCB6B;">wget</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-testnet.sh</span></span></code></pre></div><p>This copies over our <code>init-testnet.sh</code> script to initialize our <code>gm</code> rollup.</p><p>You can view the contents of the script to see how we initialize the gm rollup.</p><h5 id="clear-previous-chain-history" tabindex="-1">Clear previous chain history <a class="header-anchor" href="#clear-previous-chain-history" aria-label="Permalink to &quot;Clear previous chain history&quot;">​</a></h5><p>Before starting the rollup, we need to remove the old project folders:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-r</span><span style="color:#A6ACCD;"> $HOME</span><span style="color:#C3E88D;">/go/bin/gmd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#A6ACCD;"> $HOME</span><span style="color:#C3E88D;">/.gm</span></span></code></pre></div><h5 id="set-the-auth-token-for-your-light-node" tabindex="-1">Set the auth token for your light node <a class="header-anchor" href="#set-the-auth-token-for-your-light-node" aria-label="Permalink to &quot;Set the auth token for your light node&quot;">​</a></h5><p>You will also need to set the auth token for your Celestia light node before running the rollup. In the terminal that you will run the <code>init-testnet.sh</code> script in, run the following:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> AUTH_TOKEN</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">celestia</span><span style="color:#C3E88D;"> light auth admin --p2p.network arabica</span><span style="color:#89DDFF;">)</span></span></code></pre></div><h5 id="start-the-new-chain" tabindex="-1">Start the new chain <a class="header-anchor" href="#start-the-new-chain" aria-label="Permalink to &quot;Start the new chain {#start-the-new-chain}&quot;">​</a></h5><p>Now, you can initialize the script with the following command:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init-testnet.sh</span></span></code></pre></div><p>With that, we have kickstarted our second <code>gmd</code> network!</p><h2 id="optional-add-a-gm-world-query" tabindex="-1">Optional: Add a &quot;GM world&quot; query <a class="header-anchor" href="#optional-add-a-gm-world-query" aria-label="Permalink to &quot;Optional: Add a &quot;GM world&quot; query&quot;">​</a></h2><h3 id="say-gm-world" tabindex="-1">💬 Say gm world <a class="header-anchor" href="#say-gm-world" aria-label="Permalink to &quot;💬 Say gm world {#say-gm-world}&quot;">​</a></h3><p>Now, we&#39;re going to get our blockchain to say <code>gm world!</code> - in order to do so you need to make the following changes:</p><ul><li>Modify a protocol buffer file</li><li>Create a keeper query function that returns data</li></ul><p>Protocol buffer files contain proto RPC calls that define Cosmos SDK queries and message handlers, and proto messages that define Cosmos SDK types. The RPC calls are also responsible for exposing an HTTP API.</p><p>The <code>Keeper</code> is required for each Cosmos SDK module and is an abstraction for modifying the state of the blockchain. Keeper functions allow us to query or write to the state.</p><h4 id="create-first-query" tabindex="-1">✋ Create your first query <a class="header-anchor" href="#create-first-query" aria-label="Permalink to &quot;✋ Create your first query {#create-first-query}&quot;">​</a></h4><p><strong>Open a new terminal instance that is not the same that you started the chain in.</strong></p><p>In your new terminal, <code>cd</code> into the <code>gm</code> directory and run this command to create the <code>gm</code> query:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ignite</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">scaffold</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">query</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--response</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">text</span></span></code></pre></div><p>Response:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">modify</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">proto/gm/gm/query.proto</span></span>
<span class="line"><span style="color:#FFCB6B;">modify</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">x/gm/client/cli/query.go</span></span>
<span class="line"><span style="color:#FFCB6B;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">x/gm/client/cli/query_gm.go</span></span>
<span class="line"><span style="color:#FFCB6B;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">x/gm/keeper/query_gm.go</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">🎉</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Created</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">query</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#FFCB6B;">gm</span><span style="color:#89DDFF;">\`</span><span style="color:#82AAFF;">.</span></span></code></pre></div><p>What just happened? <code>query</code> accepts the name of the query (<code>gm</code>), an optional list of request parameters (empty in this tutorial), and an optional comma-separated list of response field with a <code>--response</code> flag (<code>text</code> in this tutorial).</p><p>Navigate to the <code>gm/proto/gm/gm/query.proto</code> file, you’ll see that <code>Gm</code> RPC has been added to the <code>Query</code> service:</p><div class="language-proto"><button title="Copy Code" class="copy"></button><span class="lang">proto</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">service</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Query</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">rpc</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Params</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">QueryParamsRequest</span><span style="color:#A6ACCD;">) </span><span style="color:#F78C6C;">returns</span><span style="color:#A6ACCD;"> (</span><span style="color:#FFCB6B;">QueryParamsResponse</span><span style="color:#A6ACCD;">) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">option</span><span style="color:#A6ACCD;"> (google.api.http).get </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;/gm/gm/params&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">rpc</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Gm</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">QueryGmRequest</span><span style="color:#A6ACCD;">) </span><span style="color:#F78C6C;">returns</span><span style="color:#A6ACCD;"> (</span><span style="color:#FFCB6B;">QueryGmResponse</span><span style="color:#A6ACCD;">) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">option</span><span style="color:#A6ACCD;"> (google.api.http).get </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;/gm/gm/gm&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>The <code>Gm</code> RPC for the <code>Query</code> service:</p><ul><li>is responsible for returning a <code>text</code> string</li><li>Accepts request parameters (<code>QueryGmRequest</code>)</li><li>Returns response of type <code>QueryGmResponse</code></li><li>The <code>option</code> defines the endpoint that is used by gRPC to generate an HTTP API</li></ul><h4 id="query-request-and-response-types" tabindex="-1">📨 Query request and response types <a class="header-anchor" href="#query-request-and-response-types" aria-label="Permalink to &quot;📨 Query request and response types {#query-request-and-response-types}&quot;">​</a></h4><p>In the same file, we will find:</p><ul><li><code>QueryGmRequest</code> is empty because it does not require parameters</li><li><code>QueryGmResponse</code> contains <code>text</code> that is returned from the chain</li></ul><div class="language-proto"><button title="Copy Code" class="copy"></button><span class="lang">proto</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">message</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">QueryGmRequest</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">message</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">QueryGmResponse</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">string</span><span style="color:#A6ACCD;"> text </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h4 id="gm-keeper-function" tabindex="-1">👋 Gm keeper function <a class="header-anchor" href="#gm-keeper-function" aria-label="Permalink to &quot;👋 Gm keeper function {#gm-keeper-function}&quot;">​</a></h4><p>The <code>gm/x/gm/keeper/query_gm.go</code> file contains the <code>Gm</code> keeper function that handles the query and returns data.</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">k Keeper</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Gm</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">goCtx context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> req </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">types</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">QueryGmRequest</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(*</span><span style="color:#A6ACCD;">types</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">QueryGmResponse</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">error</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> req </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil,</span><span style="color:#A6ACCD;"> status</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Error</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">codes</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">InvalidArgument</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">invalid request</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	ctx </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> sdk</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">UnwrapSDKContext</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">goCtx</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	_ </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> ctx</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">types</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">QueryGmResponse</span><span style="color:#89DDFF;">{},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>The <code>Gm</code> function performs the following actions:</p><ul><li>Makes a basic check on the request and throws an error if it’s <code>nil</code></li><li>Stores context in a <code>ctx</code> variable that contains information about the environment of the request</li><li>Returns a response of type <code>QueryGmResponse</code></li></ul><p>Currently, the response is empty and you&#39;ll need to update the keeper function.</p><p>Our <code>query.proto</code> file defines that the response accepts <code>text</code>. Use your text editor to modify the keeper function in <code>gm/x/gm/keeper/query_gm.go</code> .</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme-palenight has-focused-lines"><code><span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">k Keeper</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Gm</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">goCtx context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Context</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> req </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">types</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">QueryGmRequest</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(*</span><span style="color:#A6ACCD;">types</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">QueryGmResponse</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">error</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> req </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil,</span><span style="color:#A6ACCD;"> status</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Error</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">codes</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">InvalidArgument</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">invalid request</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	ctx </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> sdk</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">UnwrapSDKContext</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">goCtx</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	_ </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> ctx</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">types</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">QueryGmResponse</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">Text</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">gm world!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>The <code>query</code> command has also scaffolded <code>x/gm/client/cli/query_gm.go</code> that implements a CLI equivalent of the gm query and mounted this command in <code>x/gm/client/cli/query.go</code>.</p><h4 id="restart-your-rollup" tabindex="-1">Restart your rollup <a class="header-anchor" href="#restart-your-rollup" aria-label="Permalink to &quot;Restart your rollup&quot;">​</a></h4><p><a href="./restart-rollup">Restart your rollup</a> so that you can now run it with the gm query.</p><h4 id="query-your-rollup" tabindex="-1">Query your rollup <a class="header-anchor" href="#query-your-rollup" aria-label="Permalink to &quot;Query your rollup&quot;">​</a></h4><p>In a separate window, run the following command:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">gmd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">q</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gm</span></span></code></pre></div><p>We will get the following JSON response:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">text:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">world!</span></span></code></pre></div><p><img src="`+n+'" alt="gm.png"></p><h2 id="next-steps" tabindex="-1">Next steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next steps&quot;">​</a></h2><p>Congratulations 🎉 you&#39;ve successfully built your first rollup and queried it!</p><p>In the next tutorial, you&#39;ll learn how to post data to Celestia&#39;s Mainnet Beta.</p><p>If you&#39;re interested in setting up a full node alongside your sequencer, see the <a href="./full-and-sequencer-node">Full and sequencer node rollup setup</a> tutorial.</p>',68),p=[t];function r(c,i,y,C,d,D){return a(),e("div",null,p)}const A=s(l,[["render",r]]);export{h as __pageData,A as default};
