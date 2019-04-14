import debounce from "awesome-debounce-promise";

export const isEmpty = x => {
  if (Array.isArray(x)) {
    return x.length === 0;
  }
  if (typeof x === "object") {
    return Object.keys(x).length === 0;
  }
  return x == null;
};

const searchJobsRequest = async (text = "") => {
  if (text.length < 4) return [];

  try {
    const response = await fetch(
      `http://api.dataatwork.org/v1/jobs/autocomplete?contains=${encodeURIComponent(
        text
      )}`
    );
    if (response.ok) {
      const json = await response.json();
      // Limit request to 100 items to avoid long lists
      return json.slice(0, 100);
    } else throw Error(`Failed to fetch jobs - status ${response.statusText}`);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchJobs = debounce(searchJobsRequest, 350);

export const getRelatedJobs = async jobId => {
  try {
    const response = await fetch(
      `http://api.dataatwork.org/v1/jobs/${jobId}/related_jobs`
    );
    if (response.ok) {
      const data = await response.json();
      return data.related_job_titles.map(({ uuid: id, title }) => ({
        id,
        title
      }));
    } else
      throw Error(
        `Failed to fetch related jobs - status ${response.statusText}`
      );
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRelatedSkills = async jobId => {
  try {
    const response = await fetch(
      `http://api.dataatwork.org/v1/jobs/${jobId}/related_skills`
    );
    if (response.ok) {
      const data = await response.json();
      return data.skills.map(
        ({
          skill_uuid: id,
          normalized_skill_name: name,
          skill_type: type,
          importance,
          level
        }) => ({
          id,
          name,
          type,
          importance,
          level
        })
      );
    } else
      throw Error(
        `Failed to get related skills - status ${response.statusText}`
      );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const splitSkillsByType = skillsArray =>
  skillsArray.reduce((result, s) => {
    if (["knowledge", "skill", "ability"].includes(s.type)) {
      result[s.type] = [...(result[s.type] || []), s];
    }
    return result;
  }, {});

const getTopNSkillsBy = (skillsArray, sortBy, n) =>
  skillsArray
    .sort((s1, s2) => s1[sortBy] - s2[sortBy])
    .slice(0, Math.min(n, skillsArray.length));

export const processSkills = skillsArray => {
  const { knowledge, skill, ability } = splitSkillsByType(skillsArray);

  const fields = getTopNSkillsBy(knowledge, "importance", 5);
  const skills = getTopNSkillsBy(skill, "importance", 15);
  const abilities = getTopNSkillsBy(ability, "importance", 15);

  const topSkillsList = getTopNSkillsBy(skill, "importance", 10);
  const topSkillsByType = { fields, skills, abilities };

  return [topSkillsList, topSkillsByType];
};

export const intersectSkills = (jobMaps, skillsList, job) => {
  let entries = skillsList.map(({ name: skill, level }) => [skill, level]);

  if (jobMaps.length > 0) {
    // Get an intersection of skills between the first jobMap and the current job
    // (the other jobMaps already have the same keys as the first one)
    entries = entries.filter(([skill]) => jobMaps[0].levels.has(skill));
  }

  const newMap = new Map(entries);

  // Now newMap contains a new intersection of keys
  // Use it to clean up up other maps
  for (let j of jobMaps) {
    for (let skill of j.levels.keys()) {
      if (!newMap.has(skill)) j.levels.delete(skill);
    }
  }

  return [...jobMaps, { name: job.title, id: job.id, levels: newMap }];
};
