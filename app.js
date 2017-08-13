$(document).ready(function() {
  $('.modal').modal();
  $('.core-stat-icon').click(getStatDetails);
  $('.core-stat-icon').hover(applyShadow, removeShadow);
  $('.icon').click(getStatDetails);
  $('.icon').hover(applyShadow, removeShadow);
  $('.skills-row').click(getSkillDetails);
  $('.skills-row').hover(highlightSkillIcon, removeHighlightSkillIcon);

  let weapons = [];
  let armor = [];
  let items = [];
  let classes = [];
  let proficiencies = [];

  // getEquipSeed();
  // getClassSeed();
  // getProficiencySeed();

  parseEquipSeed();
  parseClassSeed();
  proficiencies = parseProficiencySeed('proficiencies')

  weapons = reformatWeapons(weapons);
  armor = reformatArmors(armor);
  items = reformatItems(items);
  classes = reformatClasses(classes);
  proficiencies = reformatProficiencies(proficiencies);

  setLocalStorage('weapons', weapons);
  setLocalStorage('armor', armor);
  setLocalStorage('items', items);
  setLocalStorage('classes', classes);
  setLocalStorage('proficiencies', proficiencies);


  // console.log('profs', proficiencies);


  function parseEquipSeed() {
    let equipment = JSON.parse(localStorage.getItem('equipment'));

    weapons = equipment.slice(0, 37);
    armor = equipment.slice(37, 50);
    items = equipment.slice(50);
  }

  function parseClassSeed() {
    classes =  JSON.parse(localStorage.getItem('classes'));
  }

  function parseProficiencySeed(seedName) {
    return JSON.parse(localStorage.getItem(seedName));
  }

});

let baseURL = 'https://cors-anywhere.herokuapp.com/http://dnd5eapi.co/api/';
let apiURL = 'http://dnd5eapi.co/api/';



// ---------------------------------- START Equipment Seed Data ----------------------------------

function getEquipSeed() {
  let url = `${baseURL}/equipment`;

  $.get(url)
    .then(weapons => {
      Promise.all(weapons.results.map((weapon, index) => {
        return Promise.resolve($.get(`${url}/${index + 1}`));
      }))
      .then(items => {
        setLocalStorage('equipment', items);
      });
    });
}

function reformatWeapons(weapons) {
  let reformattedWeapons = weapons.map((weapon, index) => {
    let damageType = normalizeDamageType(weapon);
    damageType = damageTypeToId(damageType);
    let reformatted = {
      id: index + 1,
      name: weapon.name,
      category: weapon['weapon_category:'],
      range_normal: weapon.range.normal,
      range_long: weapon.range.long,
      cost_value: weapon.cost.quantity,
      cost_unit: weapon.cost.unit,
      damage_dice_count: weapon.damage.dice_count,
      damage_dice_value: weapon.damage.dice_value,
      weight: weapon.weight,
      damage_type_id: damageType,
      url: weapon.url
    }
    return reformatted;
  })
  return reformattedWeapons;
}

function normalizeDamageType(weapon) {
  let damageType = 'unavailable';
  if (weapon.damage.damage_type) {
    if (weapon.damage.damage_type.name) {
      damageType = weapon.damage.damage_type.name;
    }
    if (weapon.damage.damage_type.name.name) {
      damageType = weapon.damage.damage_type.name.name;
    }
  } else if (weapon.damage.type.name){
    damageType = weapon.damage.type.name;
  }
  return damageType;
}

function damageTypeToId(type) {
  switch (type) {
  case 'Acid':
    type = 1;
    break;
  case 'Bludgeoning':
    type = 2;
    break;
  case 'Cold':
    type = 3;
    break;
  case 'Fire':
    type = 4;
    break;
  case 'Force':
    type = 5;
    break;
  case 'Lightning':
    type = 6;
    break;
  case 'Necrotic':
    type = 7;
    break;
  case 'Piercing':
    type = 8;
    break;
  case 'Poison':
    type = 9;
    break;
  case 'Psychic':
    type = 10;
    break;
  case 'Radiant':
    type = 11;
    break;
  case 'Slashing':
    type = 12;
    break;
  case 'Thunder':
    type = 13;
    break;
  default:
    type = 1;
  }
  return type;
}

function setLocalStorage(itemName, item) {
  localStorage.setItem(itemName, JSON.stringify(item));
}

function reformatArmors(armors) {
  let reformattedArmors = armors.map((armor, index) => {
    let reformatted = {
      id: index + 1,
      name: armor.name,
      category: armor['armor_category:'],
      ac_base: armor.armor_class.base,
      ac_dex_bonus: armor.armor_class.dex_bonus,
      ac_max_bonus: armor.armor_class.max_bonus,
      strength_min: armor.str_minimum,
      stealth_disadvantage: armor.stealth_disadvantage,
      weight: armor.weight,
      cost_value: armor.cost.quantity,
      cost_unit: armor.cost.unit,
      url: armor.url
    }
    return reformatted;
  })
  return reformattedArmors;
}

function reformatItems(items) {
  let reformattedItems = items.map((item, index) => {
    let reformatted = {
      id: index + 1,
      name: item.name,
      category: item.gear_category || item.vehicle_category || item.tool_category,
      weight: item.weight || null,
      cost_value: item.cost.quantity,
      cost_unit: item.cost.unit,
      url: item.url
    }
    return reformatted;
  })
  return reformattedItems;
}

// ---------------------------------- START Class Seed Data ----------------------------------

function getClassSeed() {
  let url = `${baseURL}/classes`;

  $.get(url)
    .then(classList => {
      Promise.all(classList.results.map((_class, index) => {
        return Promise.resolve($.get(`${url}/${index + 1}`));
      }))
      .then(classes => {
        setLocalStorage('classes', classes);
      })
    });
}

function reformatClasses(classes) {
  let reformattedClasses = classes.map((_class, index) => {
    let reformatted = {
      id: index + 1,
      name: _class.name,
      hit_die: _class.hit_die,
      url: _class.url
    }
    return reformatted;
  })
  return reformattedClasses;
}

// ---------------------------------- START Proficiency Seed Data ----------------------------------


function getProficiencySeed() {
  let url = `${baseURL}/proficiencies`;

  $.get(url)
    .then(profList => {
      console.log(profList);
      Promise.all(profList.results.map((prof, index) => {
        return Promise.resolve($.get(`${url}/${index + 1}`));
      }))
      .then(profs => {
        console.log(profs);
        setLocalStorage('proficiencies', profs);
      })
    });
}

function reformatProficiencies(profs) {
  let reformattedProfs = profs.map((prof, index) => {
    let reformatted = {
      id: index + 1,
      name: prof.name,
      type: prof.type,
      url: prof.url
    }
    return reformatted;
  })
  return reformattedProfs;
}

// ---------------------------------- START Proficiency Seed Data ----------------------------------

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
