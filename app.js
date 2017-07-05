$(document).ready(function() {
  $('.modal').modal();
  $('.core-stat-icon').click(getStatDetails);

});

let baseURL = 'https://cors-anywhere.herokuapp.com/http://dnd5eapi.co/api/';

function getStatDetails() {
  let id = $(this).attr('data-api-id');
  let url = `${baseURL}ability-scores/${id}`
  $.get(url, showStatDetails)
}

function showStatDetails(stat) {
  // console.log(stat);
  let name = stat.full_name;
  let description = stat.desc[0];
  let descriptionCheck = stat.desc[1];
  let skills = stat.skills;

  console.log(skills);

  $('#modal1').empty();
  $('#modal1').append(
    `<div class="modal-content">
      <h2>${name}</h2>
      <p>${description}</p>
      <p>${descriptionCheck}</p>
      <div class="stat-skills"></div>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    </div>`
  );

  if (skills.length > 0) {
    skills.forEach(function(skill) {
      $('.stat-skills').append(
        `<div class="chip">${skill.name}</div>`
      );
    });
  }

  $('#modal1').modal('open');

}
