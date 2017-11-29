<h1>feathers todos</h1>
<p>feathers todos app, built with: feathers v2 + webpack. 
implement from feathers blog and do some update code on it.</p>

<h3>requirement:</h3>
<p>mongo db installed</p>

<h3>run</h3>
<ul>
<li>run mongodb. follow this instructions if ur using windows with mongodb community edition installed => https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition</li>
<li>on <i>'local'</i> mongodb database create <i>'todos'</i> collection</li>
<li>clone this repo<pre>git clone https://github.com/idr17/feathers-todos.git</pre></li>
<li><pre>npm install --save-dev feathers feathers-rest feathers-socketio mongodb feathers-mongodb ejs webpack@latest</pre></li>

<li>run todos app</li>
<li>with persistent mongodb connection.<pre>node mongo.js</pre></li>
<li>open browser => localhost:3030 => app todos with view OR</li>
<li>localhost:3030/todos => data with json formatted.</li>
<li>you can post or get data from server through view or using curl or postman.</li>

<li>todos with stateles data <pre>node app.js</pre></li>
<li>open browser => localhost:3030/todos => data with json formatted.</li>
<li>you can post or get data from server using curl, or postman.</li>
</ul>