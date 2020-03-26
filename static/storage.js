if(!localStorage.getItem('username'))
    localStorage.setItem('username','');
document.addEventListener('DOMContentLoaded', ()=> {
  document.querySelector('#username').innerHTML = localStorage.getItem('username');

  document.querySelector('#submit').onclick = () => {
    let username = document.querySelector('#inlineFormInputGroupUsername2').value;
    document.querySelector('#username').innerHTML = username;
    localStorage.setItem('username',username);

  }

  document.querySelector('#create_channel').disabled = true;

  document.querySelector('#new_channels_name').onkeyup = () =>{
    if (document.querySelector('#new_channels_name').value.length >0)
        document.querySelector('#create_channel').disabled = false;
    else
        document.querySelector('#create_channel').disabled = true;
  };
  document.querySelector('#create_channel').onclick = () =>{

    const request = new XMLHttpRequest();
    const channel_name = document.querySelector('#new_channels_name').value;
    request.open('POST','/messanger');

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      if (data.success){
        const button = document.createElement('button');
        button.className = 'list-group-item list-group-item-action';
        button.innerHTML = data.channel;

        document.querySelector('#yoho').innerHTML = 'ajaba';
        document.querySelector('#channels_list').append(button);
        document.querySelector('#new_channels_name').value = '';

        // return false;

      }
    }
    // const data = new FormData();
    // data.append('new_channel',channel_name);
    //
    // request.send(data);
    // request.send(document.querySelector('#channels_list'))
    return false;







    // const button = document.createElement('button');
    // button.className = 'list-group-item list-group-item-action';
    // var channel_name = document.querySelector('#new_channels_name').value;
    // button.innerHTML = channel_name;

    // channels.push(channel_name);
    // document.querySelector("#yoho").innerHTML = channels;
    // localStorage.setItem('channels',channels);
    //
    // document.querySelector('#channels_list').append(button);
    // document.querySelector('#new_channels_name').value = '';

    // return false;
  }
});
