import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req,res)=>{
    try{
        const response = await axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani");
        const result  = response.data.data.surahs;
        const surahData = result.map((surah)=>{
            return {
                name: surah.englishName,
                noOfAyah: surah.ayahs.length,
                surah_no: surah.number,
            };
        });
        res.render("index.ejs",{surahData});
    }catch(err){
        console.log(err);
    }
});

app.get("/surah/:surah_no", async (req, res)=>{
    const surah = req.params.surah_no;
    try{
        const result = await axios.get(`http://api.alquran.cloud/v1/surah/${surah}`);
        const content = result.data.data;
        const surahData = {
                name: content.englishName,
                noOfAyah: content.ayahs.length,
                surah_content: content.ayahs.map(ayah=> ayah.text),
            };
        res.render("surah.ejs",{surahData});
    }catch(err){
        console.log(err);
    }
})



app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});