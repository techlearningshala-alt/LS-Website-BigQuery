import React, { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { TrendingUp } from "lucide-react";
import { getSearchData } from "@/services/SearchService";

const typeLabelMap = {
  university: "University",
  course: "Course",
  university_course: "University Course",
  specialization: "Specialization",
  university_course_specialization: "University Course Specialization",
};

const getUniversityLabel = (source) => {
  return (
    source.university_name ||
    source.university_course_name ||
    source.university ||
    null
  );
};


const Search = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);

    // if (!value.trim()) {
    //   setResults([]);
    //   return;
    // }

    try {
      setLoading(true);
      const res = await getSearchData(value);
      setResults(res?.data?.data || []);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getRedirectUrl = (item) => {
    const { university_slug, course_slug, slug, type } = item._source;

    switch (type) {
      case "university":
        return `/university/${slug}`;
      case "course":
        return `/courses/${slug}`;
      case "university_course":
        return `/university/${university_slug}/${course_slug}`;
      case "specialization":
        return `/courses/${course_slug}/${slug}`;
      case "university_course_specialization":
        return `/university/${university_slug}/${course_slug}/${slug}`;
      default:
        return "#";
    }
  };

  const trendingSearches = [
    {
      name: "Online MBA",
      url: "/courses/online-mba",
    },
    {
      name: "Online BBA",
      url: "/courses/online-bba",
    },
    {
      name: "Sharda University Online",
      url: "/university/sharda-university-online",
    },
  ];

  return (
    <div>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger || "Search"}
      </span>

      <CommandDialog shouldFilter={false} shouldFilterGlobal={false} open={open} onOpenChange={setOpen} className="h-[400px]">
        <CommandInput
          placeholder="Course, Specialization , Universities..."
          value={query}
          onValueChange={handleSearch}
          className="pe-8"
        />

        <CommandList>
          {loading && <CommandEmpty>Searching...</CommandEmpty>}

          {!loading && results.length > 0 && (
            <CommandGroup heading="Results">
              {results.map((item, index) => {
                // 🔍 SEARCH VALUE (PLAIN TEXT ONLY)
                const searchValue = [
                  item._source.name,
                  item._source.university_course_name,
                  item._source.university_course_specialization_name,
                ]
                  .filter(Boolean)
                  .join(" ");

                // 🎨 DISPLAY VALUE (HTML / HIGHLIGHT)
                const displayHTML =
                  item.highlight?.name ||
                  item.highlight?.university_course_name ||
                  item.highlight?.university_course_specialization_name ||
                  searchValue;

                return (
                  <CommandItem
                    key={`${item._index}-${item._id}-${index}`}
                    // value={searchValue}
                    value={`${item._source.type}-${item._source.slug}-${item._source.university_slug || ""}`}
                    onSelect={() => {
                      const url = getRedirectUrl(item);
                      setOpen(false);
                      window.location.href = url;
                    }}
                  >
                    <div className="flex flex-col">
                      {/* DISPLAY ONLY — IGNORE FOR SEARCH */}
                      <span
                        data-cmdk-ignore
                        dangerouslySetInnerHTML={{ __html: displayHTML }}
                      />

                      <span className="text-xs text-muted-foreground">
                      {getUniversityLabel(item._source) && (
    <>
      {getUniversityLabel(item._source)} ·{" "}
    </>
  )}
  {typeLabelMap[item._source.type]}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {!loading && query && results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {!query && (
            <CommandGroup heading="Trending searches">
              {trendingSearches.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item.name}
                  onSelect={() => {
                    setOpen(false);
                    window.location.href = item.url;
                  }}
                >
                  <TrendingUp className="w-4 h-4 mr-2" /> {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default Search;
