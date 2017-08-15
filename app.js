$(document).ready(function() {
  $('.modal').modal();
  $('.core-stat-icon').click(getStatDetails);
  $('.core-stat-icon').hover(applyShadow, removeShadow);
  $('.icon').click(getStatDetails);
  $('.icon').hover(applyShadow, removeShadow);
  $('.skills-row').click(getSkillDetails);
  $('.skills-row').hover(highlightSkillIcon, removeHighlightSkillIcon);

  let weapons, armor, items, classes, proficiencies,
  spells, magicSchools, damageTypes, weaponProperties,
  skills, abilityScores, features, traits;


  // ---------------------------------- ACQUIRE DATA FROM API ----------------------------------

  // getEquipSeed();
  // getClassSeed();
  // getProficiencySeed();
  // getSpellSeed();
  // getSeedData('magic-schools');
  // getSeedData('damage-types');
  // getSeedData('weapon-properties');
  // getSeedData('skills');
  // getSeedData('ability-scores');
  // getSeedData('features');
  // getSeedData('traits');

  // parseEquipSeed();
  // classes = parseSeedData('classes')
  // proficiencies = parseSeedData('proficiencies');
  // spells = parseSeedData('spells');
  // magicSchools = parseSeedData('magic-schools');
  // damageTypes = parseSeedData('damage-types');
  // weaponProperties = parseSeedData('weapon-properties');
  // skills = parseSeedData('skills')
  // abilityScores = parseSeedData('ability-scores');
  // features = parseSeedData('features');
  traits = parseSeedData('traits');

  console.log(traits);

  // weapons = reformatWeapons(weapons);
  // armor = reformatArmors(armor);
  // items = reformatItems(items);
  // classes = reformatClasses(classes);
  // proficiencies = reformatProficiencies(proficiencies);
  // spells = reformatSpells(spells);
  // magicSchools = reformatSchools(magicSchools);
  // damageTypes = reformatDamageTypes(damageTypes);
  // weaponProperties = reformatWeaponProps(weaponProperties);
  // skills = reformatSkills(skills);
  // abilityScores = reformatAbilities(abilityScores);
  // features = reformatFeatures(features);
  traits = reformatTraits(traits);

  console.log(traits);

  // setLocalStorage('weapons', weapons);
  // setLocalStorage('armor', armor);
  // setLocalStorage('items', items);
  // setLocalStorage('classes', classes);
  // setLocalStorage('proficiencies', proficiencies);
  // setLocalStorage('spells', spells);
  // setLocalStorage('magic-schools', magicSchools);
  // setLocalStorage('damage-types', damageTypes);
  // setLocalStorage('weapon-properties', weaponProperties);
  // setLocalStorage('skills', skills);
  // setLocalStorage('ability-scores', abilityScores);
  // setLocalStorage('features', features);
  setLocalStorage('traits', traits);

  // console.log('profs', proficiencies);


  function parseEquipSeed() {
    let equipment = JSON.parse(localStorage.getItem('equipment'));

    weapons = equipment.slice(0, 37);
    armor = equipment.slice(37, 50);
    items = equipment.slice(50);
  }

  function parseSeedData(seedName) {
    return JSON.parse(localStorage.getItem(seedName));
  }

});

let baseURL = 'https://cors-anywhere.herokuapp.com/http://dnd5eapi.co/api/';
let apiURL = 'http://dnd5eapi.co/api/';

// ---------------------------------- START Features Seed Data ----------------------------------

function reformatTraits(traits) {
  let reformattedTraits = traits.map((trait, index) => {
    let reformatted = {
      id: index + 1,
      name: trait.name,
      url: trait.url
    }
    return reformatted;
  })
  return reformattedTraits;
}

// ---------------------------------- START Features Seed Data ----------------------------------

function reformatFeatures(features) {
  let reformattedFeatures = features.map((feature, index) => {
    let classId = classToId(feature.class.name)
    let reformatted = {
      id: index + 1,
      name: feature.name,
      level: feature.level,
      class_id: classId,
      url: feature.url
    }
    return reformatted;
  })
  return reformattedFeatures;
}

function classToId(_class) {
  switch (_class) {
  case 'Barbarian':
    _class = 1;
    break;
  case 'Bard':
    _class = 2;
    break;
  case 'Cleric':
    _class = 3;
    break;
  case 'Druid':
    _class = 4;
    break;
  case 'Fighter':
    _class = 5;
    break;
  case 'Monk':
    _class = 6;
    break;
  case 'Paladin':
    _class = 7;
    break;
  case 'Ranger':
    _class = 8;
    break;
  case 'Rogue':
    _class = 9;
    break;
  case 'Sorcerer':
    _class = 10;
    break;
  case 'Warlock':
    _class = 11;
    break;
  case 'Wizard':
    _class = 12;
    break;
  default:
    _class = 1;
  }
  return _class;
}


// ---------------------------------- START Abilities Seed Data ----------------------------------

function reformatAbilities(abilities) {
  let reformattedAbilities = abilities.map((ability, index) => {
    let reformatted = {
      id: index + 1,
      name: ability.name,
      full_name: ability.full_name,
      url: ability.url
    }
    return reformatted;
  })
  return reformattedAbilities;
}

// ---------------------------------- START Skills Seed Data ----------------------------------

function reformatSkills(skills) {
  let reformattedSkills = skills.map((skill, index) => {
    let abilityId = abilityToId(skill.ability_score.name);
    let reformatted = {
      id: index + 1,
      name: skill.name,
      description: skill.desc[0],
      ability_id: abilityId,
      url: skill.url
    }
    return reformatted;
  })
  return reformattedSkills;
}

function abilityToId(ability) {
  switch (ability) {
  case 'STR':
    ability = 1;
    break;
  case 'DEX':
    ability = 2;
    break;
  case 'CON':
    ability = 3;
    break;
  case 'INT':
    ability = 4;
    break;
  case 'WIS':
    ability = 5;
    break;
  case 'CHA':
    ability = 6;
    break;
  default:
    ability = 1;
  }
  return ability;
}

// ---------------------------------- START Weapon-Property Seed Data ----------------------------------

function reformatWeaponProps(props) {
  let reformattedWeaponProps = props.map((prop, index) => {
    let reformatted = {
      id: index + 1,
      name: prop.name,
      description: prop.desc[0],
      url: prop.url
    }
    return reformatted;
  })
  return reformattedWeaponProps;
}

// ---------------------------------- START Damage-Type Seed Data ----------------------------------

function reformatDamageTypes(types) {
  let reformattedTypes = types.map((type, index) => {
    let reformatted = {
      id: index + 1,
      name: type.name,
      description: type.desc[0],
      url: type.url
    }
    return reformatted;
  })
  return reformattedTypes;
}

// ---------------------------------- START Magic-School Seed Data ----------------------------------


function getSeedData(resource) {
  let url = `${baseURL}/${resource}`;

  $.get(url)
    .then(list => {
      Promise.all(list.results.map((item, index) => {
        return Promise.resolve($.get(`${url}/${index + 1}`));
      }))
      .then(items => {
        setLocalStorage(resource, items);
      });
    });
}

function reformatSchools(schools) {
  let reformattedSchools = schools.map((school, index) => {
    let reformatted = {
      id: index + 1,
      name: school.name,
      description: school.desc,
      url: school.url
    }
    return reformatted;
  })
  return reformattedSchools;
}

// ---------------------------------- START Spell Seed Data ----------------------------------

function getSpellSeed() {
  let url = `${baseURL}/spells`;

  $.get(url)
    .then(spellList => {
      Promise.all(spellList.results.map((spell, index) => {
        return Promise.resolve($.get(`${url}/${index + 1}`));
      }))
      .then(spells => {
        setLocalStorage('spells', spells);
      });
    });
}

function reformatSpells(spells) {
  let reformattedSpells = spells.map((spell, index) => {
    let magicSchool = magicSchoolToId(spell.school.name);
    let reformatted = {
      id: index + 1,
      name: spell.name,
      range: spell.range,
      ritual: spell.ritual,
      duration: spell.duration,
      concentration: spell.concentration,
      casting_time: spell.casting_time,
      level: spell.level,
      magic_school_id: magicSchool,
      url: spell.url
    }
    return reformatted;
  })
  return reformattedSpells;
}

function magicSchoolToId(school) {
  switch (school) {
  case 'Abjuration':
    school = 1;
    break;
  case 'Conjuration':
    school = 2;
    break;
  case 'Divination':
    school = 3;
    break;
  case 'Enchantment':
    school = 4;
    break;
  case 'Evocation':
    school = 5;
    break;
  case 'Illusion':
    school = 6;
    break;
  case 'Necromancy':
    school = 7;
    break;
  case 'Transmutation':
    school = 8;
    break;
  default:
    school = 1;
  }
  return school;
}

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
