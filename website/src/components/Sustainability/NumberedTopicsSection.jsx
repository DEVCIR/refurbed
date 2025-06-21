import { NumberedTopicCard, NUMBERED_TOPICS } from "./Common";

export const NumberedTopicsSection = () => {
  // 4 columns per row
  const rows = [
    NUMBERED_TOPICS.slice(0, 4),
    NUMBERED_TOPICS.slice(4, 8),
    NUMBERED_TOPICS.slice(8, 10),
  ];
  return (
    <div className="bg-sustainability-light py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {rows.map((row, i) => (
          <div className="grid grid-cols-4 gap-8 mb-8" key={i}>
            {row.map((topic) => (
              <NumberedTopicCard key={topic.number} {...topic} />
            ))}
            {/* Fill empty columns for last row */}
            {i === 2 && [<div key="empty1"></div>, <div key="empty2"></div>]}
          </div>
        ))}
      </div>
    </div>
  );
};
