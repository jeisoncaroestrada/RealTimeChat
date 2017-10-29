var config = {
    domain: 'http://localhost',
    port: 3000,
};
var socket = io.connect(`${config.domain}:${config.port}`,{'forceNew': true})

socket.on('messages',function(data){
    console.log(data);
    render(data);
})


function render (data){
    var html = data.map(function(elem, index){
        return( `
            <div>
                <strong>${elem.author}</stong>:
                <em>${elem.text}</em>
            </div> 
        `)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
    console.log(e);
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    }

    document.getElementById('username').value = '';
    document.getElementById('text').value = '';
    
    socket.emit('new-message', payload);
    return false;
}