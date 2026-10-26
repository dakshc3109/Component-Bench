

function initChecklist(root = document) {
  const checks = [...root.querySelectorAll('.task-check')];
  const progress = root.querySelector('.task-progress');
  const summary = root.querySelector('.task-summary');
  const update = () => {
    const completed = checks.filter((check) => check.checked).length;
    progress.value = completed;
    summary.textContent = completed + ' of ' + checks.length + ' tasks complete';
  };
  checks.forEach((check) => check.addEventListener('change', update));
  update();
}

const component = {
  id: 'checklist',
  cat: 'Inputs',
  title: 'Task checklist',
  desc: 'A satisfying checklist with a live completion meter and progress summary.',
  html: `<div class="tasks-stage">
<div class="tasks-card">
  <div class="tasks-heading"><span>Launch checklist</span><span class="task-summary" aria-live="polite"></span></div>
  <progress class="task-progress" max="3" value="1" aria-label="Tasks completed"></progress>
  <label class="task-row"><input class="task-check" type="checkbox" checked><span>Choose a template</span></label>
  <label class="task-row"><input class="task-check" type="checkbox"><span>Customize your colors</span></label>
  <label class="task-row"><input class="task-check" type="checkbox"><span>Publish your page</span></label>
</div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initChecklist
};

export default component;
