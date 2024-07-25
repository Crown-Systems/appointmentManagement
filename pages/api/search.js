export default function handler(req, res) {
    if (req.method === 'POST') {
        const search = req.body.search;
        console.log(search);
        // Handle your search logic here
        res.status(200).json({ message: 'Search received', search });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}