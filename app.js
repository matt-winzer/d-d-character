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
  let name = stat.full_name;
  let description = stat.desc[0];
  let descriptionCheck = stat.desc[1];
  let skills = stat.skills;

  emptyModal('#modal1');
  appendSkills('#modal1', name, description, descriptionCheck);
  if (skills.length > 0) {
    skills.forEach(function(skill) {
      $('.stat-skills').append(
        `<div class="chip">${skill.name}</div>`
      );
    });
  }
  openModal('#modal1');
}

function appendSkills(modalID, name, description, descriptionCheck) {
  $(modalID).append(
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
}

function openModal(modalID) {
  return $(modalID).modal('open');
}

function emptyModal(modalID) {
  return $(modalID).empty();
}
