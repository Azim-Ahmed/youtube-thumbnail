import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Button, Form } from 'reactstrap';
require('dotenv').config()

const download = require('image-downloader')


const Search = () => {
    const [thumbnailData, setThumbnailData] = useState([])
    const searchInput = useRef('');

    console.log(searchInput.current.value);

    const submitFormm = (e) => {
        e.preventDefault();
    }
    const searchMove = () => {
        console.log(searchInput.current.value);
        let youtubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput.current.value}&type=video&key=${process.env.REACT_APP_API}`
        fetch(youtubeURL)
            .then(res => res.json())
            .then(data => setThumbnailData(data.items))
    }
    // console.log(thumbnailData);

    return (
        <Container className="mt-5 text-center">
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <p>
                        Download youtube and vimeo thumbnail images of all quality for free. This application let you download thumbnails of all quality. Just paste the URL of the thumbnail video in the below input and click Get Thumbnail Image
                </p>
                    <Form onSubmit={submitFormm}>
                        <input ref={searchInput} placeholder="Enter the youtube URL here" required type="text" className="form-control" />
                        <Button onClick={searchMove} outline color="dark" type="submit">Get Thumbnail Images</Button>
                    </Form>
                </Col>
            </Row>
            <div>
                {
                    thumbnailData && thumbnailData.map((item, i) =>
                        <div key={i}>
                            <Row className="my-4">
                                <Col>
                                    <img className="mb-1" src={item.snippet.thumbnails.high.url} alt="" /> <br />
                                    <button >
                                       <Link to={item.snippet.thumbnails.url} target="_blank" download>Download</Link>
                                    </button>
                                </Col>
                            </Row>
                            <Row className="my-4">
                                <Col>
                                    <img className="mb-1" src={item.snippet.thumbnails.medium.url} alt="" /> <br />
                                    <button><a href={item.snippet.thumbnails.high.url} download="image"> download</a></button>
                                </Col>
                            </Row>
                            <Row className="my-4">
                                <Col>
                                    <img className="mb-1" src={item.snippet.thumbnails.default.url} alt="" /> <br />
                                    <button><a href={item.snippet.thumbnails.high.url} download="image"> download</a></button>
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </div>
        </Container >
    );
};

export default Search;