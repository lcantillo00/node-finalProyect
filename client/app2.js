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
                $('#stock-table').append(`<tr class="tdT"><td class="tdT">${value.name}</td>+<td class="tdT">${value.price}</td>+<td class="tdT">${value.symbol}</td>+<td class="tdT"><button class='btndelete' id='btndelete'idendb='${value._id}'>DELETE</button><button class='edit'id='btnedit' idendb='${value.id}'>Edit</button></td></tr>`)

            })
            }
        });

    };

    $('#stock-table').on('click', '.btndelete', function (e){
        e.preventDefault();
       var del = $(this).attr('idendb');

      $.ajax({
          url:'/stock/'+del,
          method:'DELETE',
          success: function(res){
              $("tdT").remove(".btndelete");


          },
          data:{
              id: del
          }
      })
  })

});

// $('#stock-table').on('click', '.btnedit', function (e){
//     // e.preventDefault();
//    var del = $(this).attr('idendb');
//
//   $.ajax({
//       url:'/stock/'+del,
//       method:'PUT',
//       success: function(res){
//
//
//
//       },
//       data:{
//           id: del
//       }
//   })
// })
//
// });
