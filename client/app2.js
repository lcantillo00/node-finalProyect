$(document).ready(function(){
    getdata();
    function getdata(search){

        $.ajax({
            url:"/stock",
            dataType:"json",
            method:'get',
            success: function(response){
            $('#stock-table').html("");
            response.forEach(function(value){
                $('#stock-table').append(`<tr class="tdT"><td class="tdT">${value.name}</td>+<td class="tdT">${value.price}</td>+<td class="tdT">${value.symbol}</td>+<td class="tdT"><button class='btndelete' id='btndelete'idendb='${value.id}'>DELETE</button><button class='edit' idendb='${value.id}'>Edit</button></td></tr>`)

            })
            }
        });

    };
  //
  //   $('#stock-table').on('click', '.btndelete', function (e){
  //       e.preventDefault();
  //      var del = $(this).attr('idendb');
  //      console.log(del);
  //     $.ajax({
  //         url:'/stock/:id',
  //         method:'DELETE',
  //         success: function(res){
  //             $("tdT").remove(".btndelete");
  //
  //
  //         },
  //         data:{
  //             id: del
  //         }
  //     })
  // })

});
