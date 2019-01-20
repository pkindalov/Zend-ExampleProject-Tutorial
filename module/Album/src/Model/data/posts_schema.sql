CREATE TABLE `posts` (`id` INTEGER PRIMARY KEY AUTO_INCREMENT, `title` varchar(100) NOT NULL, `text` TEXT NOT NULL);

INSERT INTO `posts` (`title`, `text`) VALUES ('Blog #1', 'Welcome to my first blog post'),
                                                                    ('Blog #2', 'Welcome to my second blog post'),
                                                                    ('Blog #3', 'Welcome to my third blog post'),
                                                                    ('Blog #4', 'Welcome to my fourth blog post'),
                                                                    ('Blog #5', 'Welcome to my fifth blog post');
