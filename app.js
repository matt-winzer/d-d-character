$(document).ready(function() {
  $('.modal').modal();
  $('.core-stat-icon').click(getStatDetails);
  $('.core-stat-icon').hover(applyShadow, removeShadow);
  $('.icon').click(getStatDetails);
  $('.icon').hover(applyShadow, removeShadow);
  $('.skills-row').click(getSkillDetails);
  $('.skills-row').hover(highlightSkillIcon, removeHighlightSkillIcon);

});

let baseURL = 'https://cors-anywhere.herokuapp.com/http://dnd5eapi.co/api/';

function getStatDetails() {
  let id = $(this).attr('data-api-id');
  let url = `${baseURL}ability-scores/${id}`;
  $.get(url, showStatDetails);
}

function showStatDetails(stat) {
  let name = stat.full_name;
  let description = stat.desc[0];
  let descriptionCheck = stat.desc[1];
  let skills = stat.skills;

  emptyModal('#modal1');
  appendStatInfo('#modal1', name, description, descriptionCheck);
  appendStatSkills(skills);
  openModal('#modal1');
}

function appendStatInfo(modalID, name, description, descriptionCheck) {
  $(modalID).append(
    `<div class="modal-content">
      <h3>${name}</h3>
      <p>${description}</p>
      <p>${descriptionCheck}</p>
      <div class="stat-skills"></div>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    </div>`
  );
}

function appendStatSkills(skills) {
  if (skills.length > 0) {
    skills.forEach(skill => {
      $('.stat-skills').append(
        `<div class="chip">${skill.name}</div>`
      );
    });
  }
}

function emptyModal(modalID) {
  return $(modalID).empty();
}

function openModal(modalID) {
  return $(modalID).modal('open');
}

function getSkillDetails() {
  let id = $(this).attr('data-api-id');
  let url = `${baseURL}skills/${id}`;
  $.get(url, showSkillDetails);
}

function showSkillDetails(skill) {
  let name = skill.name;
  let description = skill.desc[0];

  emptyModal('#modal1');
  appendSkillInfo('#modal1', name, description);
  openModal('#modal1');
}

function appendSkillInfo(modalID, name, description) {
  // console.log(this);
  $(modalID).append(
    `<div class="modal-content">
      <h3>${name}</h3>
      <p>${description}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    </div>`
  );
}

function applyShadow() {
  $(this).addClass('z-depth-3');
}

function removeShadow() {
  $(this).removeClass('z-depth-3');
}

function highlightSkillIcon() {
  let $icon = $(this).find('.icon');
  $icon.addClass('z-depth-3');
  $icon.css('background-color', 'yellow');
}

function removeHighlightSkillIcon() {
  let $icon = $(this).find('.icon');
  $icon.removeClass('z-depth-3');
  $icon.css('background-color', '');
}
