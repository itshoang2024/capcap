import { c as createComponent, d as createAstro, r as renderTemplate, f as addAttribute, i as renderComponent, j as renderHead, k as Fragment } from '../chunks/astro/server_BVSFX_9F.mjs';
import 'piccolore';
import { createClient } from '@supabase/supabase-js';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const PAGE_TYPES = [
    "cover",
    "title_page",
    "toc",
    "content",
    "exercise",
    "blank",
    "other"
  ];
  const OBJECTS_PRESENT_ENUM = [
    "person_child",
    "person_adult",
    "student",
    "teacher",
    "animal_generic",
    "animal_pet",
    "animal_farm",
    "animal_wild",
    "food_fruit",
    "food_vegetable",
    "food_bundle",
    "book",
    "notebook",
    "pen",
    "pencil",
    "school_bag",
    "clock_analog",
    "clock_digital",
    "countable_object",
    "grouped_object",
    "table",
    "chart",
    "illustration_scene"
  ];
  const ERROR_TAGS = [
    "OCR_MISSING",
    "OCR_WRONG",
    "OCR_UNREADABLE",
    "OCR_NOT_CONTEXTUALIZED",
    "HALLUCINATION",
    "WRONG_LAYOUT",
    "SUBJECTIVE_REASONING",
    "TOO_LONG_SHORT",
    "DETAIL_INCOHERENT_FLOW",
    "MISQUOTED_TEXT",
    "COUNTING_WRONG",
    "CLOCK_READING_WRONG",
    "ID_ISSUE",
    "IMAGE_MISMATCH"
  ];
  const PREFIXES = [
    "SGK_CanhDieu_DaoDuc_1",
    "SGK_CanhDieu_DaoDuc_2",
    "SGK_CanhDieu_DaoDuc_3",
    "SGK_CanhDieu_TiengViet_2_Tap1",
    "SGK_CanhDieu_TiengViet_2_Tap2",
    "SGK_CanhDieu_Toan_1",
    "SGK_CanhDieu_Toan_3_Tap1",
    "SGK_CanhDieu_TuNhienVaXaHoi_1",
    "SGK_CanhDieu_TuNhienVaXaHoi_2",
    "SGK_CanhDieu_TuNhienVaXaHoi_3"
  ];
  let message = "";
  let finished = false;
  let totalCount = 0;
  let checkedCount = 0;
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const id = formData.get("id");
      const page_type = formData.get("page_type");
      const has_text = formData.has("has_text");
      const has_table = formData.has("has_table");
      const objects_present = formData.getAll("objects_present");
      const error_tags = formData.getAll("error_tags");
      const notes = formData.get("notes");
      const change_log = formData.get("change_log");
      const { error: updateError } = await supabase.from("dataset").update({
        page_type,
        has_text,
        has_table,
        objects_present,
        error_tags,
        notes: notes ? notes : null,
        change_log: change_log ? change_log : null,
        is_checked: true
      }).eq("id", id);
      if (updateError) {
        console.error("Update Error:", updateError);
        message = "Error updating row: " + updateError.message;
      } else {
        message = "Successfully saved!";
      }
    } catch (e) {
      console.error(e);
      message = "Server error processing request.";
    }
  }
  const cookieHeader = Astro2.request.headers.get("cookie") || "";
  const getCookie = (name) => {
    const value = `; ${cookieHeader}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };
  const filterCookie = getCookie("dataset_filter");
  let activeFilters = PREFIXES;
  if (filterCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(filterCookie));
      if (Array.isArray(parsed) && parsed.length > 0) {
        activeFilters = parsed;
      }
    } catch (e) {
      console.error("Error parsing filter cookie", e);
    }
  }
  let dataRow = null;
  if (!finished) {
    const priorities = ["high", "normal", "low"];
    const filterQuery = activeFilters.map((p) => `id.like.${p}%`).join(",");
    for (const p of priorities) {
      let query = supabase.from("dataset").select("*").eq("is_checked", false).eq("review_priority", p);
      if (filterQuery) {
        query = query.or(filterQuery);
      }
      const { data } = await query.limit(50);
      if (data && data.length) {
        dataRow = data[Math.floor(Math.random() * data.length)];
        break;
      }
    }
    totalCount = 0;
    checkedCount = 0;
    let totalQuery = supabase.from("dataset").select("*", { count: "exact", head: true });
    let checkedQuery = supabase.from("dataset").select("*", { count: "exact", head: true }).eq("is_checked", true);
    if (filterQuery) {
      totalQuery = totalQuery.or(filterQuery);
      checkedQuery = checkedQuery.or(filterQuery);
    }
    const [totalRes, checkedRes] = await Promise.all([totalQuery, checkedQuery]);
    if (totalRes.count !== null) totalCount = totalRes.count;
    if (checkedRes.count !== null) checkedCount = checkedRes.count;
    if (!dataRow) {
      let countQuery = supabase.from("dataset").select("*", { count: "exact", head: true }).eq("is_checked", false);
      if (filterQuery) {
        countQuery = countQuery.or(filterQuery);
      }
      const { count } = await countQuery;
      if (count === 0) {
        const { count: globalCount } = await supabase.from("dataset").select("*", { count: "exact", head: true }).eq("is_checked", false);
        if (globalCount === 0) {
          finished = true;
        }
      }
    }
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', '><title>Dataset Review</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">', `</head> <body class="bg-white text-slate-900 font-['Inter'] h-screen overflow-hidden antialiased" data-astro-cid-j7pv25f6> `, ` <script>
      function toggle(radio, id) {
        const el = document.getElementById(id);
        const cl = document.getElementById("changelog_container");

        if (radio.value === "no") {
          el.classList.remove("hidden");
          cl.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }

        const anyNo = document.querySelectorAll(
          'input[type="radio"][value="no"]:checked',
        );
        if (anyNo.length === 0) {
          cl.classList.add("hidden");
        } else {
          cl.classList.remove("hidden");
        }
      }

      // Filter Logic
      const filterBtn = document.getElementById("filter-btn");
      const filterModal = document.getElementById("filter-modal");
      const closeFilter = document.getElementById("close-filter");
      const applyFilter = document.getElementById("apply-filter");
      const selectAll = document.getElementById("select-all");
      const clearAll = document.getElementById("clear-all");

      if (filterBtn) {
        filterBtn.addEventListener("click", () => {
          filterModal.classList.remove("hidden");
        });

        closeFilter.addEventListener("click", () => {
          filterModal.classList.add("hidden");
        });

        // Close on clicking outside
        document.addEventListener("click", (e) => {
          if (
            !filterModal.contains(e.target) &&
            !filterBtn.contains(e.target)
          ) {
            filterModal.classList.add("hidden");
          }
        });

        selectAll.addEventListener("click", () => {
          document
            .querySelectorAll('input[name="prefix_filter"]')
            .forEach((cb) => (cb.checked = true));
        });

        clearAll.addEventListener("click", () => {
          document
            .querySelectorAll('input[name="prefix_filter"]')
            .forEach((cb) => (cb.checked = false));
        });

        applyFilter.addEventListener("click", () => {
          const selected = Array.from(
            document.querySelectorAll('input[name="prefix_filter"]:checked'),
          ).map((cb) => cb.value);
          // Save to cookie (1 year expiry)
          const d = new Date();
          d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
          document.cookie = \`dataset_filter=\${encodeURIComponent(JSON.stringify(selected))}; expires=\${d.toUTCString()}; path=/\`;
          window.location.reload();
        });
      }
    </script> </body> </html>`], ['<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', '><title>Dataset Review</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">', `</head> <body class="bg-white text-slate-900 font-['Inter'] h-screen overflow-hidden antialiased" data-astro-cid-j7pv25f6> `, ` <script>
      function toggle(radio, id) {
        const el = document.getElementById(id);
        const cl = document.getElementById("changelog_container");

        if (radio.value === "no") {
          el.classList.remove("hidden");
          cl.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }

        const anyNo = document.querySelectorAll(
          'input[type="radio"][value="no"]:checked',
        );
        if (anyNo.length === 0) {
          cl.classList.add("hidden");
        } else {
          cl.classList.remove("hidden");
        }
      }

      // Filter Logic
      const filterBtn = document.getElementById("filter-btn");
      const filterModal = document.getElementById("filter-modal");
      const closeFilter = document.getElementById("close-filter");
      const applyFilter = document.getElementById("apply-filter");
      const selectAll = document.getElementById("select-all");
      const clearAll = document.getElementById("clear-all");

      if (filterBtn) {
        filterBtn.addEventListener("click", () => {
          filterModal.classList.remove("hidden");
        });

        closeFilter.addEventListener("click", () => {
          filterModal.classList.add("hidden");
        });

        // Close on clicking outside
        document.addEventListener("click", (e) => {
          if (
            !filterModal.contains(e.target) &&
            !filterBtn.contains(e.target)
          ) {
            filterModal.classList.add("hidden");
          }
        });

        selectAll.addEventListener("click", () => {
          document
            .querySelectorAll('input[name="prefix_filter"]')
            .forEach((cb) => (cb.checked = true));
        });

        clearAll.addEventListener("click", () => {
          document
            .querySelectorAll('input[name="prefix_filter"]')
            .forEach((cb) => (cb.checked = false));
        });

        applyFilter.addEventListener("click", () => {
          const selected = Array.from(
            document.querySelectorAll('input[name="prefix_filter"]:checked'),
          ).map((cb) => cb.value);
          // Save to cookie (1 year expiry)
          const d = new Date();
          d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
          document.cookie = \\\`dataset_filter=\\\${encodeURIComponent(JSON.stringify(selected))}; expires=\\\${d.toUTCString()}; path=/\\\`;
          window.location.reload();
        });
      }
    </script> </body> </html>`])), addAttribute(Astro2.generator, "content"), renderHead(), finished ? renderTemplate`<div class="flex flex-col items-center justify-center h-full w-full bg-slate-50" data-astro-cid-j7pv25f6> <div class="max-w-md text-center space-y-6" data-astro-cid-j7pv25f6> <h1 class="text-3xl font-bold text-slate-900" data-astro-cid-j7pv25f6>All Done</h1> <p class="text-slate-500" data-astro-cid-j7pv25f6>
You've successfully reviewed the entire dataset.
</p> <button onclick="window.location.reload()" class="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors" data-astro-cid-j7pv25f6>
Check Again
</button> </div> </div>` : dataRow ? renderTemplate`<div class="flex h-full" data-astro-cid-j7pv25f6>  <div class="w-5/12 bg-zinc-900 flex flex-col relative" data-astro-cid-j7pv25f6> <div class="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-zinc-900/90 backdrop-blur-sm z-10 border-b border-white/5" data-astro-cid-j7pv25f6> <div class="flex flex-col space-y-2" data-astro-cid-j7pv25f6> <span class="font-mono text-xs text-zinc-500" data-astro-cid-j7pv25f6>
ID: ${dataRow.id} </span>  <div class="flex flex-col space-y-1" data-astro-cid-j7pv25f6> <div class="flex items-center space-x-2" data-astro-cid-j7pv25f6> <span class="text-[10px] uppercase tracking-wider font-bold text-zinc-400" data-astro-cid-j7pv25f6>
Progress
</span> <span class="text-[10px] text-zinc-300 font-mono" data-astro-cid-j7pv25f6> ${checkedCount} / ${totalCount} </span> </div> <div class="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/5" data-astro-cid-j7pv25f6> <div class="h-full bg-indigo-500 rounded-full transition-all duration-500"${addAttribute(`width: ${totalCount > 0 ? checkedCount / totalCount * 100 : 0}%`, "style")} data-astro-cid-j7pv25f6></div> </div> </div> </div> <span${addAttribute(`text-xs font-medium px-2 py-0.5 rounded ${dataRow.review_priority === "high" ? "bg-rose-500/10 text-rose-400" : dataRow.review_priority === "normal" ? "bg-blue-500/10 text-blue-400" : "bg-zinc-700 text-zinc-400"}`, "class")} data-astro-cid-j7pv25f6> ${dataRow.review_priority.toUpperCase()} PRIORITY
</span> </div> <div class="flex-1 flex items-center justify-center p-6 overflow-hidden" data-astro-cid-j7pv25f6> <img${addAttribute(`${process.env.SUPABASE_URL}/storage/v1/object/public/images/${dataRow.id}.png`, "src")} alt="Dataset Image" class="max-w-full max-h-full object-contain shadow-2xl" data-astro-cid-j7pv25f6> </div> </div>  <div class="w-7/12 bg-white border-l border-slate-200 flex flex-col relative" data-astro-cid-j7pv25f6> <div class="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white z-20" data-astro-cid-j7pv25f6> <div class="flex items-baseline space-x-3" data-astro-cid-j7pv25f6> <h2 class="font-semibold text-slate-900 text-lg" data-astro-cid-j7pv25f6>
Review Item
</h2> <span class="text-xs text-slate-400 uppercase tracking-widest font-medium" data-astro-cid-j7pv25f6>
Data Validation
</span> </div>  <button id="filter-btn" class="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-200" data-astro-cid-j7pv25f6> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" data-astro-cid-j7pv25f6></path> </svg> <span data-astro-cid-j7pv25f6>
Filter Dataset (
${activeFilters.length === PREFIXES.length ? "All" : activeFilters.length}
)
</span> </button> </div>  <div id="filter-modal" class="hidden absolute top-16 right-8 w-80 bg-white shadow-2xl rounded-xl border border-slate-200 z-50 animate-fade-in flex flex-col max-h-[80vh]" data-astro-cid-j7pv25f6> <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl" data-astro-cid-j7pv25f6> <h3 class="font-bold text-slate-700 text-sm" data-astro-cid-j7pv25f6>Filter by Book</h3> <button id="close-filter" class="text-slate-400 hover:text-rose-500" data-astro-cid-j7pv25f6> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-j7pv25f6></path> </svg> </button> </div> <div class="p-2 border-b border-slate-100 flex justify-between text-xs px-4" data-astro-cid-j7pv25f6> <button id="select-all" class="text-indigo-600 hover:text-indigo-800 font-medium" data-astro-cid-j7pv25f6>
Select All
</button> <button id="clear-all" class="text-slate-500 hover:text-rose-500 font-medium" data-astro-cid-j7pv25f6>
Clear All
</button> </div> <div class="overflow-y-auto p-4 space-y-2 flex-1 custom-scrollbar" data-astro-cid-j7pv25f6> ${PREFIXES.map((prefix) => renderTemplate`<label class="flex items-start space-x-3 cursor-pointer group p-1 hover:bg-slate-50 rounded text-sm" data-astro-cid-j7pv25f6> <input type="checkbox" name="prefix_filter"${addAttribute(prefix, "value")}${addAttribute(activeFilters.includes(prefix), "checked")} class="mt-0.5 rounded border-slate-300 text-indigo-600 shadow-sm focus:ring-0" data-astro-cid-j7pv25f6> <span class="text-slate-600 group-hover:text-slate-900 break-words leading-tight" data-astro-cid-j7pv25f6> ${prefix} </span> </label>`)} </div> <div class="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl" data-astro-cid-j7pv25f6> <button id="apply-filter" class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-md transition-all text-sm" data-astro-cid-j7pv25f6>
Apply & Reload
</button> </div> </div> ${message && renderTemplate`<div class="mx-8 mt-6 p-4 bg-emerald-50 text-emerald-700 text-sm rounded-lg border border-emerald-100 flex items-center gap-2" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-j7pv25f6></path> </svg> ${message} </div>`} <form method="POST" class="flex-1 overflow-y-auto p-8 space-y-10" data-astro-cid-j7pv25f6> <input type="hidden" name="id"${addAttribute(dataRow.id, "value")} data-astro-cid-j7pv25f6>  <div class="space-y-8" data-astro-cid-j7pv25f6> <div class="flex items-center space-x-2 border-b border-slate-100 pb-2" data-astro-cid-j7pv25f6> <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider" data-astro-cid-j7pv25f6>
Classification
</h3> </div>  <div class="bg-slate-50 p-5 rounded-xl border border-slate-100" data-astro-cid-j7pv25f6> <div class="flex justify-between items-center mb-3" data-astro-cid-j7pv25f6> <span class="text-sm font-medium text-slate-700" data-astro-cid-j7pv25f6>
Page Type:${" "} <span class="font-bold text-slate-900" data-astro-cid-j7pv25f6> ${dataRow.page_type.replace("_", " ")} </span> </span> <div class="flex items-center space-x-3" data-astro-cid-j7pv25f6> <span class="text-xs font-medium text-slate-500" data-astro-cid-j7pv25f6>
Correct?
</span> <label class="inline-flex items-center cursor-pointer" data-astro-cid-j7pv25f6> ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` <input type="radio" name="page_type_correct" value="yes" checked class="text-indigo-600 focus:ring-0" onchange="toggle(this, 'page_type_edit')" data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-600" data-astro-cid-j7pv25f6>Yes</span> ` })} </label> <label class="inline-flex items-center cursor-pointer" data-astro-cid-j7pv25f6> ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` <input type="radio" name="page_type_correct" value="no" class="text-rose-500 focus:ring-0" onchange="toggle(this, 'page_type_edit')" data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-600" data-astro-cid-j7pv25f6>No</span> ` })} </label> </div> </div> <div id="page_type_edit" class="hidden animate-fade-in mt-3" data-astro-cid-j7pv25f6> <select name="page_type" class="w-full bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5" data-astro-cid-j7pv25f6> ${PAGE_TYPES.map((type) => renderTemplate`<option${addAttribute(type, "value")}${addAttribute(dataRow.page_type === type, "selected")} data-astro-cid-j7pv25f6> ${type.replace("_", " ")} </option>`)} </select> </div> </div>  <div class="grid grid-cols-2 gap-6" data-astro-cid-j7pv25f6> ${["has_text", "has_table"].map((key) => renderTemplate`<div class="bg-slate-50 p-5 rounded-xl border border-slate-100" data-astro-cid-j7pv25f6> <div class="flex justify-between items-center mb-2" data-astro-cid-j7pv25f6> <span class="text-sm font-medium text-slate-700" data-astro-cid-j7pv25f6> ${key.replace("_", " ")}?
</span> <div class="flex items-center space-x-2" data-astro-cid-j7pv25f6> <label class="inline-flex items-center cursor-pointer" data-astro-cid-j7pv25f6> <input type="radio"${addAttribute(`${key}_correct`, "name")} value="yes" checked class="text-indigo-600 focus:ring-0"${addAttribute(`toggle(this, '${key}_edit')`, "onchange")} data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-600" data-astro-cid-j7pv25f6>Yes</span> </label> <label class="inline-flex items-center cursor-pointer" data-astro-cid-j7pv25f6> <input type="radio"${addAttribute(`${key}_correct`, "name")} value="no" class="text-rose-500 focus:ring-0"${addAttribute(`toggle(this, '${key}_edit')`, "onchange")} data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-600" data-astro-cid-j7pv25f6>No</span> </label> </div> </div> <div class="text-sm font-bold text-slate-900 mb-2" data-astro-cid-j7pv25f6> ${dataRow[key] ? "Yes" : "No"} </div> <div${addAttribute(`${key}_edit`, "id")} class="hidden mt-2" data-astro-cid-j7pv25f6> <label class="inline-flex items-center cursor-pointer" data-astro-cid-j7pv25f6> <input type="checkbox"${addAttribute(key, "name")} class="rounded border-slate-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"${addAttribute(dataRow[key], "checked")} data-astro-cid-j7pv25f6> <span class="ml-2 text-sm text-slate-600" data-astro-cid-j7pv25f6>
Override value
</span> </label> </div> </div>`)} </div>  <div class="bg-slate-50 p-5 rounded-xl border border-slate-100" data-astro-cid-j7pv25f6> <div class="flex justify-between items-start mb-3" data-astro-cid-j7pv25f6> <span class="text-sm font-medium text-slate-700" data-astro-cid-j7pv25f6>
Objects Present
</span> <div class="flex items-center space-x-3" data-astro-cid-j7pv25f6> <span class="text-xs font-medium text-slate-500" data-astro-cid-j7pv25f6>
Correct?
</span> <label class="inline-flex items-center cursor-pointer" data-astro-cid-j7pv25f6> ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` <input type="radio" name="objects_correct" value="yes" checked class="text-indigo-600 focus:ring-0" onchange="toggle(this, 'objects_edit')" data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-600" data-astro-cid-j7pv25f6>Yes</span> ` })} </label> <label class="inline-flex items-center cursor-pointer" data-astro-cid-j7pv25f6> ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` <input type="radio" name="objects_correct" value="no" class="text-rose-500 focus:ring-0" onchange="toggle(this, 'objects_edit')" data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-600" data-astro-cid-j7pv25f6>No</span> ` })} </label> </div> </div> <div class="flex flex-wrap gap-2 mb-2" data-astro-cid-j7pv25f6> ${dataRow.objects_present && dataRow.objects_present.length > 0 ? dataRow.objects_present.map((obj) => renderTemplate`<span class="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-xs font-medium shadow-sm" data-astro-cid-j7pv25f6> ${obj.replace("_", " ")} </span>`) : renderTemplate`<span class="text-slate-400 italic text-xs" data-astro-cid-j7pv25f6>
No objects listed
</span>`} </div> <div id="objects_edit" class="hidden mt-4 pt-4 border-t border-slate-200" data-astro-cid-j7pv25f6> <div class="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar" data-astro-cid-j7pv25f6> ${OBJECTS_PRESENT_ENUM.map((obj) => renderTemplate`<label class="flex items-center space-x-2 cursor-pointer p-1 hover:bg-slate-100 rounded" data-astro-cid-j7pv25f6> <input type="checkbox" name="objects_present"${addAttribute(obj, "value")}${addAttribute(
    dataRow.objects_present && dataRow.objects_present.includes(obj),
    "checked"
  )} class="rounded border-slate-300 text-indigo-600 shadow-sm focus:ring-0" data-astro-cid-j7pv25f6> <span class="text-xs text-slate-600" data-astro-cid-j7pv25f6> ${obj.replace("_", " ")} </span> </label>`)} </div> </div> </div> </div>  <div class="space-y-8 pt-6 border-t border-slate-100" data-astro-cid-j7pv25f6> <div class="flex items-center space-x-2 border-b border-slate-100 pb-2" data-astro-cid-j7pv25f6> <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider" data-astro-cid-j7pv25f6>
Content Verification
</h3> </div> ${["caption_short", "caption_detail", "text_in_image"].map(
    (field) => renderTemplate`<div class="bg-white" data-astro-cid-j7pv25f6> <div class="flex justify-between items-start mb-2" data-astro-cid-j7pv25f6> <span class="text-sm font-medium text-slate-900 capitalize px-2 border-l-4 border-indigo-500" data-astro-cid-j7pv25f6> ${field.replace("_", " ")} </span> <div class="flex items-center space-x-3 bg-slate-50 px-3 py-1 rounded-full border border-slate-100" data-astro-cid-j7pv25f6> <span class="text-xs text-slate-400 font-medium uppercase tracking-wider" data-astro-cid-j7pv25f6>
Is this correct?
</span> <label class="inline-flex items-center cursor-pointer hover:bg-white px-2 py-0.5 rounded transition-colors" data-astro-cid-j7pv25f6> <input type="radio"${addAttribute(`${field}_correct`, "name")} value="yes" checked class="text-indigo-600 focus:ring-0"${addAttribute(`toggle(this, '${field}_err')`, "onchange")} data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-700 font-semibold" data-astro-cid-j7pv25f6>
Yes
</span> </label> <label class="inline-flex items-center cursor-pointer hover:bg-white px-2 py-0.5 rounded transition-colors" data-astro-cid-j7pv25f6> <input type="radio"${addAttribute(`${field}_correct`, "name")} value="no" class="text-rose-500 focus:ring-0"${addAttribute(`toggle(this, '${field}_err')`, "onchange")} data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-700 font-semibold" data-astro-cid-j7pv25f6>
No
</span> </label> </div> </div> <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-2" data-astro-cid-j7pv25f6> <p class="text-sm text-slate-700 whitespace-pre-wrap max-h-60 overflow-y-auto font-mono leading-relaxed"${addAttribute(dataRow[field], "title")} data-astro-cid-j7pv25f6> ${dataRow[field] || renderTemplate`<span class="italic text-slate-400" data-astro-cid-j7pv25f6>Empty</span>`} </p> </div> <div${addAttribute(`${field}_err`, "id")} class="hidden mt-3 p-4 bg-rose-50 rounded-lg border border-rose-100 animate-fade-in" data-astro-cid-j7pv25f6> <p class="text-xs font-bold text-rose-700 uppercase mb-2 tracking-wide" data-astro-cid-j7pv25f6>
WHAT IS WRONG?
</p> <div class="grid grid-cols-2 gap-2" data-astro-cid-j7pv25f6> ${ERROR_TAGS.map((tag) => renderTemplate`<label class="flex items-center space-x-2 cursor-pointer hover:bg-white/50 p-1 rounded transition-colors" data-astro-cid-j7pv25f6> <input type="checkbox" name="error_tags"${addAttribute(tag, "value")} class="rounded border-rose-300 text-rose-500 focus:ring-0 w-3.5 h-3.5" data-astro-cid-j7pv25f6> <span class="text-xs text-rose-800 font-medium lowercase first-letter:uppercase" data-astro-cid-j7pv25f6> ${tag.replace("OCR_", "").replace(/_/g, " ")} </span> </label>`)} </div> </div> </div>`
  )} </div>  <div class="pt-6 border-t border-slate-100 space-y-6" data-astro-cid-j7pv25f6> <div class="bg-amber-50/50 p-5 rounded-xl border border-amber-100" data-astro-cid-j7pv25f6> <div class="flex justify-between items-center mb-2" data-astro-cid-j7pv25f6> <span class="text-sm font-medium text-slate-800" data-astro-cid-j7pv25f6>
Notes Correct?
</span> <div class="flex items-center space-x-2" data-astro-cid-j7pv25f6> <label class="inline-flex items-center cursor-pointer" data-astro-cid-j7pv25f6> ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` <input type="radio" name="notes_correct" value="yes" checked class="text-indigo-600 focus:ring-0" onchange="toggle(this, 'notes_edit')" data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-600" data-astro-cid-j7pv25f6>Yes</span> ` })} </label> <label class="inline-flex items-center cursor-pointer" data-astro-cid-j7pv25f6> ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` <input type="radio" name="notes_correct" value="no" class="text-amber-500 focus:ring-0" onchange="toggle(this, 'notes_edit')" data-astro-cid-j7pv25f6> <span class="ml-1 text-xs text-slate-600" data-astro-cid-j7pv25f6>No</span> ` })} </label> </div> </div> <div id="notes_edit" class="hidden mt-2" data-astro-cid-j7pv25f6> <textarea name="notes" rows="3" class="w-full text-sm border-amber-200 rounded-md shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 bg-white" placeholder="Enter corrected notes..." data-astro-cid-j7pv25f6>                      ${dataRow.notes || ""}
                    </textarea> </div> </div> <div id="changelog_container" class="hidden" data-astro-cid-j7pv25f6> <label class="block text-sm font-bold text-slate-700 mb-1" data-astro-cid-j7pv25f6>
Change Log
</label> <input type="text" name="change_log" class="w-full text-sm border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3" placeholder="Explain why values were changed..." data-astro-cid-j7pv25f6> </div> </div> <div class="sticky bottom-0 bg-white pt-4 pb-2 border-t border-slate-100 -mx-8 px-8 z-30" data-astro-cid-j7pv25f6> <button type="submit" class="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5" data-astro-cid-j7pv25f6>
Save & Continue
<svg class="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-j7pv25f6></path> </svg> </button> </div> </form> </div> </div>` : renderTemplate`<div class="flex items-center justify-center flex-col h-full text-slate-400 text-sm space-y-4" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>No more items found for these filters.</p> <button onclick="document.cookie='dataset_filter=; Max-Age=0; path=/'; window.location.reload()" class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors" data-astro-cid-j7pv25f6>
Clear Filters & Try Again
</button> </div>`);
}, "/home/felix/Desktop/capcap/src/pages/index.astro", void 0);
const $$file = "/home/felix/Desktop/capcap/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
