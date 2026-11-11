import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 KoneksiAlumni API running on port ${PORT}`);
  console.log(`⚡ Runtime: Bun ${Bun.version}`);
});
