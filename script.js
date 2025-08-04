// Script for rocket burdened with size slider

let selectedBurdenGroup = null;
let svg = document.getElementById('rocket-svg');
let form = document.getElementById('burden-form');

let baseX = 300;
let baseY = 330;
let selectedPosition = null;
let previewGroup = null;

const chainImage = 'chain.svg';
const burdenImage = 'burden.svg';
const chainSpacing = 15;
const chainSize = 50;
let currentSize = 50;

// 🎚️ Listen for slider changes
document.getElementById('burden-size').addEventListener('input', function () {
  document.getElementById('sizeValue').textContent = this.value;
  updatePreview();
});

// 🖱️ Click to preview position
svg.addEventListener('click', function (e) {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
  selectedPosition = { x: svgPoint.x, y: svgPoint.y };
  updatePreview();
});

// 🎯 Live preview of burden
function updatePreview() {
  if (!selectedPosition) return;
  if (previewGroup) svg.removeChild(previewGroup);

  const text = document.getElementById('burden-text').value || "Preview";
  const sizeLevel = parseInt(document.getElementById('burden-size').value) || 1;
  currentSize = (sizeLevel / 100) * (20 * 50); // scale so 100 = old size 20
  const x = selectedPosition.x;
  const y = selectedPosition.y;

  previewGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const previewImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
  previewImg.setAttribute("href", burdenImage);
  previewImg.setAttribute("width", currentSize);
  previewImg.setAttribute("height", currentSize);
  previewImg.setAttribute("x", x - currentSize / 2);
  previewImg.setAttribute("y", y - currentSize / 2);
  previewImg.setAttribute("opacity", "0.5");
  previewGroup.appendChild(previewImg);

  const previewText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  previewText.setAttribute("x", x);
  previewText.setAttribute("y", y + 5);
  previewText.setAttribute("text-anchor", "middle");
  previewText.setAttribute("fill", "gray");
  previewText.setAttribute("font-size", Math.min(16, currentSize / 8));
  previewText.setAttribute("font-weight", "bold");
  previewText.textContent = text;
  previewGroup.appendChild(previewText);

  svg.appendChild(previewGroup);
}

document.getElementById('burden-text').addEventListener('input', updatePreview);

// ➕ Place burden
form.onsubmit = (e) => {
  e.preventDefault();

  if (!selectedPosition) {
    alert("Please click on the rocket area to place the burden first.");
    return;
  }

  const text = document.getElementById('burden-text').value;
  const sizeLevel = parseInt(document.getElementById('burden-size').value);
  const size = (sizeLevel / 100) * (20 * 50); // scale size
  const x = selectedPosition.x;
  const y = selectedPosition.y;

  const burdenGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const burdenId = `burden-${Date.now()}`; // Unique ID
  burdenGroup.setAttribute("id", burdenId);
  burdenGroup.setAttribute("class", "burden");
  burdenGroup.setAttribute("transform", `translate(${x}, ${y})`);
  burdenGroup.dataset.size = size;
  burdenGroup.dataset.text = text;

  // ⛓️ Chain links
  const dx = x - baseX;
  con

