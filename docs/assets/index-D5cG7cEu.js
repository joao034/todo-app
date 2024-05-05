(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(o){if(o.ep)return;o.ep=!0;const l=i(o);fetch(o.href,l)}})();const S=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let y;const C=new Uint8Array(16);function L(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(C)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function E(e,t=0){return n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]}const A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:A};function P(e,t,i){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const a=e.random||(e.rng||L)();return a[6]=a[6]&15|64,a[8]=a[8]&63|128,E(a)}class T{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const d={All:"All",Completed:"Completed",Pending:"Pending"},s={todos:[new T("Todo 1"),new T("Todo 2"),new T("Todo 3")],filter:d.All},k=()=>{v(),console.log("Init Store")},v=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=d.All}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(s))},I=(e=d.All)=>{switch(e){case d.All:return[...s.todos];case d.Completed:return s.todos.filter(t=>t.done);case d.Pending:return s.todos.filter(t=>!t.done);default:throw new Error`Option ${e} not valid!`}},U=e=>{if(!e)throw Error("Description is required");s.todos.push(new T(e)),g()},x=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},O=e=>{s.todos=s.todos.filter(t=>t.id!==e),g()},q=()=>{s.todos=s.todos.filter(e=>!e.done),g()},D=(e=d.All)=>{if(!Object.keys(d).includes(e))throw new Error("Filter not valid");s.filter=e,g()},F=()=>s.filter,c={initStore:k,loadStore:v,getTodos:I,addTodo:U,toggleTodo:x,deleteTodo:O,deleteTodosCompleted:q,setSelectedFilter:D,getCurrentFilter:F};let b;const M=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Element ${e} not found`);b.innerHTML=c.getTodos(d.Pending).length},N=e=>{if(!e)throw new Error("A todo object is required");const t=`<div class="view">
            <input class="toggle" type="checkbox" ${e.done?"checked":" "}>
            <label>${e.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">`;let i=document.createElement("li");return i.innerHTML=t,i.setAttribute("data-id",e.id),e.done&&i.classList.add("completed"),i};let h;const H=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(i=>{h.append(N(i))})},m={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{const r=c.getTodos(c.getCurrentFilter());H(m.TodoList,r),i()},i=()=>{M(m.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=S,document.querySelector(e).append(r),t()})();const a=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),l=document.querySelector(m.ClearCompleted),u=document.querySelectorAll(m.TodoFilters);a.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(c.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");c.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const p=r.target.className==="destroy",f=r.target.closest("[data-id]");!f||!p||(c.deleteTodo(f.getAttribute("data-id")),t())}),l.addEventListener("click",()=>{c.deleteTodosCompleted(),t()}),u.forEach(r=>{r.addEventListener("click",p=>{switch(u.forEach(f=>f.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":c.setSelectedFilter(d.All);break;case"Pendientes":c.setSelectedFilter(d.Pending);break;case"Completados":c.setSelectedFilter(d.Completed);break}t()})})};c.initStore();V("#app");
