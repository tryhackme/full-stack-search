
function DetailPage({ title }: { title: string }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>More details about {title} will go here.</p>
    </div>
  );
}

export default DetailPage